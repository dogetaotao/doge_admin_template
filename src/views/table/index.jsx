import React, {useEffect, useState} from 'react';
import {useCallbackState, useComponentWillMount} from "../../hooks";
import {
  Tag,
  Table,
  Form,
  Button,
  Input,
  Collapse,
  Divider,
  Pagination,
  message,
  Select,
} from "antd";
import {tabList, deleteItem, editItem} from "../../api/table"
import EditForm from "./forms";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import moment from "moment";

const {Column} = Table
const {Panel} = Collapse

let _isMounted = false

const TableComponent = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [listQuery, setListQuery] = useCallbackState({
    pageNumber: 1,
    pageSize: 10,
    title: "",
    star: "",
    status: ""
  })
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editModalLoading, setEditModalLoading] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({
    id: 0,
    author: "",
    date: "",
    readings: 0,
    star: "★",
    status: "published",
    title: ""
  })

  const [form] = Form.useForm()

  const fetchData = () => {
    setLoading(true)
    tabList(listQuery).then((response) => {
      setLoading(false)
      const list = response.data.data.items
      console.log(list, _isMounted)
      const total = response.data.data.total
      if (_isMounted) {
        setList(list)
        setTotal(total)
      }
    })
  }

  useEffect(() => {
    _isMounted = true
    fetchData()
  }, [])

  const filterTitleChange = (e) => {
    const value = e.target.value
    setListQuery({
      ...listQuery,
      title: value
    })
  }

  const filterStatusChange = (value) => {
    setListQuery({
      ...listQuery,
      status: value
    })
  }

  const filterStarChange = (value) => {
    setListQuery({
      ...listQuery,
      star: value
    })
  }

  const changePage = (pageNumber, pageSize) => {
    setListQuery({...listQuery, pageNumber}, () => {
      fetchData()
    })
  }

  const changePageSize = (current, pageSize) => {
    setListQuery({...listQuery, pageSize, pageNumber: 1}, () => {
      fetchData()
    })
  }

  const handleDelete = (row) => {
    deleteItem({id: row.id}).then(res => {
      message.success("删除成功")
      fetchData()
    })
  }

  const handleEdit = (row) => {
    setCurrentRowData(Object.assign({}, row))
    const date = moment(row.date)
    const star = row.star.length
    form.setFieldsValue({
      id: row.id,
      author: row.author,
      date: date,
      readings: row.readings,
      star: star,
      status: row.status,
      title: row.title
    })
    setEditModalVisible(true)
  }

  const handleOk = (_) => {
    form.validateFields().then((fieldsValue) => {
      const values = {
        ...fieldsValue,
        'star': "".padStart(fieldsValue['star'], '★'),
        'date': fieldsValue['date'].format('YYYY-MM-DD HH-mm-ss')
      }
      setEditModalLoading(true)
      editItem(values).then((response) => {
        form.resetFields()
        setEditModalVisible(false)
        setEditModalLoading(false)
        message.success("编辑成功!")
        fetchData()
      })
    }).catch(e => {
      message.error("编辑失败!")
    })
  }

  const handleCancel = (_) => {
    setEditModalVisible(false)
  }

  return (
    <div className="app-container">
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="筛选" key="1">
          <Form layout="inline">
            <Form.Item label="标题:">
              <Input onChange={filterTitleChange}/>
            </Form.Item>
            <Form.Item label="类型:">
              <Select
                style={{width: 120}}
                onChange={filterStatusChange}
              >
                <Select.Option value="published">published</Select.Option>
                <Select.Option value="draft">draft</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="推荐指数:">
              <Select
                style={{width: 120}}
                onChange={filterStarChange}
              >
                <Select.Option value={1}>★</Select.Option>
                <Select.Option value={2}>★★</Select.Option>
                <Select.Option value={3}>★★★</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={fetchData}>
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <br/>
      <Table
        bordered
        rowKey={(record) => record.id}
        dataSource={list}
        loading={loading}
        pagination={false}
      >
        <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id}/>
        <Column title="标题" dataIndex="title" key="title" width={200} align="center"/>
        <Column title="作者" dataIndex="author" key="author" width={100} align="center"/>
        <Column title="阅读量" dataIndex="readings" key="readings" width={195} align="center"/>
        <Column title="推荐指数" dataIndex="star" key="star" width={195} align="center"/>
        <Column title="状态" dataIndex="status" key="status" width={195} align="center" render={(status) => {
          let color = status === "published" ? "green" : status === "deleted" ? "red" : ""
          return(
            <Tag color={color} key={status}>
              {status}
            </Tag>
          )
        }}/>
        <Column title="时间" dataIndex="date" key="date" width={195} align="center"/>
        <Column title="操作" key="action" width={195} align="center" render={(text, row) => (
          <span>
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={handleEdit.bind(null, row)}/>
            <Divider type="vertical"/>
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={handleDelete.bind(null, row)}/>
          </span>
        )}/>
      </Table>
      <br/>
      <Pagination
        total={total}
        pageSizeOptions={["10", "20", "30", "40"]}
        showTotal={(total) => `共${total}条数据`}
        onChange={changePage}
        current={listQuery.pageNumber}
        onShowSizeChange={changePageSize}
        showSizeChanger
        showQuickJumper
        hideOnSinglePage={true}
      />
      <EditForm
        currentRowData={currentRowData}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={editModalLoading}
        visible={editModalVisible}
        form={form}
      />
    </div>
  )
}

export default TableComponent;
