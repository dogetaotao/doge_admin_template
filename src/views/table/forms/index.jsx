import React from 'react';
import {Form, Input, DatePicker, Select, Rate, Modal} from "antd";
import moment from "moment"
import "moment/locale/zh-cn"

moment.locale("zh-cn")

const EditForm = (props) => {

  const {
    visible,
    onCancel,
    onOk,
    form,
    confirmLoading,
    currentRowData
  } = props

  const {id, author, date, readings, star, status, title} = currentRowData

  const formItemLayout = {
    labelCol: {
      sm: {span: 4}
    },
    wrapperCol: {
      sm: {span: 16}
    }
  }

  return (
    <Modal
      title="编辑"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        initialValues={{
          id: id,
          title: title,
          author: author,
          readings: readings,
          star: star,
          status: status,
          date: moment(date || "YYYY-MM-DD HH:mm:ss")
        }}
        {...formItemLayout}
      >
        <Form.Item
          label="序号:"
          name="id"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="标题:"
          name="title"
          rules={
            [
              {
                required: true,
                message: "请输入标题！"
              }
            ]
          }
        >
          <Input placeholder="标题"/>
        </Form.Item>
        <Form.Item
          label="作者:"
          name="author"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="阅读量:"
          name="readings"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="推荐指数:"
          name="star"
        >
          <Rate count={3}/>
        </Form.Item>
        <Form.Item
          label="状态:"
          name="status"
        >
          <Select>
            <Select.Option value="published">published</Select.Option>
            <Select.Option value="draft">draft</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="时间:"
          name="date"
          rules={
            [
              {
                type: "object",
                required: true,
                message: "请选择时间!"
              }
            ]
          }
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditForm;
