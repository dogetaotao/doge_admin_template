import React, {useEffect, useState} from 'react';
import {Table, Form, Tag, Button, Input, message, Collapse} from "antd";
import {excelList} from "../../api/excel";
import {FileZipOutlined, LogoutOutlined} from "@ant-design/icons";

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
    dataIndex: "author",
    key: "author",
    width: 100,
    align: "center",
    render: (author) => <Tag key={author}>{author}</Tag>
  },
  {
    title: "Readings",
    dataIndex: "readings",
    key: "readings",
    width: 195,
    align: "center"
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 195,
    align: "center"
  }

]

let _isMounted = false

const Zip = () => {

  const [list, setList] = useState([])
  const [filename, setFilename] = useState("file")
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const fetchData = () => {
    excelList().then((response) => {
      const list = response.data.data.item
      if (_isMounted) {
        setList(list)
      }
    })
  }

  useEffect(() => {
    _isMounted = true
    fetchData()
  }, [])

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows)
    setSelectedRowKeys(selectedRowKeys)
  }

  const formatJson = (filterVal, jsonData) => {
    return jsonData.map((v) => filterVal.map((j) => v[j]))
  }

  const filenameChange = (e) => {
    setFilename(e.target.value)
  }

  const handleDownLoad = (type) => {
    if (type === "selected" && selectedRowKeys.length === 0) {
      message.error("至少选择一项导出")
      return
    }
    setDownloadLoading(true)
    import("../../lib/Export2Zip").then((zip) => {
      const tHeader = ["Id", "Title", "Author", "Readings", "Date"]
      const filterVal = ["id", "title", "author", "readings", "date"]
      const newList = type === "all" ? list : selectedRows
      const data = formatJson(filterVal, newList)

      zip.export_txt_to_zip(tHeader, data, filename, filename)

      setSelectedRowKeys([])
      setDownloadLoading(false)
    })
  }

  return (
    <div className="app-container">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="导出选项" key="1">
          <Form layout="inline">
            <Form.Item label="文件名:">
              <Input
                style={{width: "250px"}}
                onChange={filenameChange}
                placeholder="请输入文件名(默认为file)"
                prefix={<FileZipOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<LogoutOutlined/>}
                onClick={handleDownLoad.bind(null, "all")}
              >
                全部导出
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<LogoutOutlined/>}
                onClick={handleDownLoad.bind(null, "selected")}
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
        rowSelection={{selectedRowKeys, onChange: onSelectChange}}
        loading={downloadLoading}
      />
    </div>
  )
}

export default Zip;
