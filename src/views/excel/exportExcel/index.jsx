import React, {useEffect, useState} from 'react';
import {useDebounce} from "../../../hooks"
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Radio,
  Select,
  message,
  Collapse,
} from "antd";

import {excelList} from "../../../api/excel";
import {FileExcelOutlined} from "@ant-design/icons";

const {Panel} = Collapse
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 200,
    align: "center"
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 200,
    align: "center"
  },
  {
    title: "Author",
    key: "author",
    dataIndex: "author",
    width: 100,
    align: "center",
    render: (author) => <Tag key={author}>{author}</Tag>,
  },
  {
    title: "Readings",
    dataIndex: "readings",
    key: "readings",
    width: 195,
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 195,
    align: "center",
  },
]

let _isMounted = false
const ExportExcel = () => {
  const [list, setList] = useState([])
  const [filename, setFilename] = useState("excel-file")
  const [autoWidth, setAutoWidth] = useState(true)
  const [bookType, setBookType] = useState("xlsx")
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectRowKeys, setSelectRowKeys] = useState([])

  const fetchData = () => {
    excelList().then((response) => {
      const list = response.data.data.item
      if (_isMounted) {
        setList(list)
      }
    })
  }

  useDebounce(filename, 300)

  useEffect(() => {
    _isMounted = true
    fetchData()
  }, [])
  const onSelectChange = (selectRowKeys, selectedRows) => {
    setSelectedRows(selectedRows)
    setSelectRowKeys(selectRowKeys)

  }
  const handleDownload = (type) => {
    if (type === "selected" && selectRowKeys.length === 0) {
      message.error("至少选择一线进行导出")
      return
    }
    setDownloadLoading(true)
    import("../../../lib/Export2Excel").then((excel) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"]
      const filterVal = ["id", "title", "author", "readings", "date"]
      //如果导出全部，则直接使用list，否则导出规定行数的
      console.log(list)
      const helpList = type === "all" ? list : selectedRows
      const data = formatJson(filterVal, helpList)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: filename,
        autoWidth: autoWidth,
        bookType: bookType
      })
      setSelectRowKeys([])
      setDownloadLoading(false)
    })
  }
  const formatJson = (filterVal, jsonData) => {
    return jsonData.map(data => filterVal.map(i => data[i]))

  }
  const filenameChange = (e) => {
    setFilename(e.target.value)
  }
  const autoWidthChange = (e) => {
    setAutoWidth(e.target.value)
  }

  const bookTypeChange = (e) => {
    setBookType(e)
  }

  const rowSelection = {
    selectRowKeys,
    onChange: onSelectChange
  }

  return (
    <div className="app-container">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="导出选项" key="1">
          <Form layout="inline">
            <Form.Item label="文件名：">
              <Input
                style={{width: "250px"}}
                prefix={
                  <FileExcelOutlined style={{color: "rgba(0, 0, 0, .25)"}}/>
                }
                placeholder="请输入文件名"
                onChange={filenameChange}
              />
            </Form.Item>
            <Form.Item label="单元宽度是否自适应：">
              <Radio.Group
                onChange={autoWidthChange}
                value={autoWidth}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="文件类型：">
              <Select
                defaultValue="xlsx"
                style={{width: 120}}
                onChange={bookTypeChange}
              >
                <Select.Option value="xlsx">xlsx</Select.Option>
                <Select.Option value="csv">csv</Select.Option>
                <Select.Option value="txt">txt</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<FileExcelOutlined/>}
                onClick={handleDownload.bind(null, "all")}
              >
                全部导出
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<FileExcelOutlined/>}
                onClick={handleDownload.bind(null, "select")}
              >
                导出已选项
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <br/>
      <Table
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={list}
        pagination={false}
        rowSelection={rowSelection}
        loading={downloadLoading}
      />
    </div>
  )
}

export default ExportExcel;
