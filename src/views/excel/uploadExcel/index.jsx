import React, {useState} from 'react';
import {Table} from "antd";
import UploadExcelComponent from "../../../components/UploadExcel";

const UploadExcel = () => {

  const [tableData, setTableData] = useState([])
  const [tableHeader, setTableHeader] = useState([])

  const handleSuccess = ({header, results}) => {
    setTableData(results)
    setTableHeader(header)
  }

  return (
    <div className="app-container">
      <UploadExcelComponent uploadSuccess={handleSuccess}/>
      <br/>
      <Table
        bordered
        columns={tableHeader.map((item) => ({
          title: item,
          dataIndex: item,
          key: item,
          width: 195,
          align: "center"
        }))}
        dataSource={tableData}
      />
    </div>
  )
}

export default UploadExcel;
