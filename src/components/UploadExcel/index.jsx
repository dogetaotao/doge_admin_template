import React, {useState} from 'react';
import PropTypes from "prop-types";
import {message, Upload} from "antd";
import * as XLSX from "xlsx";
import {InboxOutlined} from "@ant-design/icons";

const {Dragger} = Upload

const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet["!ref"])
  let C
  const R = range.s.r

  for (C = range.s.c; C <= range.e.c; C++) {
    const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]
    let hdr = "UNKNOWN" + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

const UploadExcel = (props) => {

  const [loading, setLoading] = useState(false)
  const [excelData, setExcelData] = useState({header: null, results: null})

  const draggerProps = () => {
    return {
      name: "file",
      multiple: false,
      accept: ".xls, .xlsx",
      progress: {
        strokeColor: {
          '0%': '#87d068',
          '100%': '#e95c10',
        },
        strokeWidth: 3,
        format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
      },

      onChange(info) {
        const {status} = info.file
        if (status === "done") {
          message.success(`${info.file.name}文件上传成功`)
        } else if (status === "error") {
          message.error(`${info.file.name}文件上传失败`)
        }
      },
      beforeUpload(file, fileList) {
        if (!isExcel(file)) {
          message.error("仅支持上传.xlsx, .xls, .csv 文件")
          return false
        }
      },
      customRequest(e) {
        renderData(e.file).then(() => {
          e.onSuccess()
        })
      }
    }
  }

  const renderData = (rawFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, {type: "array"})
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = getHeaderRow(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        generateData({header, results})
        resolve()
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  const generateData = ({header, results}) => {
    setExcelData(() => {
      results.map((item, index) => {
        item.key = item.key? item.key : index
      })
      props.uploadSuccess && props.uploadSuccess({header, results})
      return {header, results}
    })
  }

  return (
    <div>
      <Dragger {...draggerProps()}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">
          拖拽至此处上传
        </p>
      </Dragger>
    </div>
  )
}

UploadExcel.propTypes = {
  uploadSuccess: PropTypes.func.isRequired
}
export default UploadExcel;
