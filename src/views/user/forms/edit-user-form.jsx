import React from 'react';
import {Form, Input, Select, Modal} from "antd";

const {TextArea} = Input

const EditUserForm = (props) => {

  const {visible, onCancel, onOk, confirmLoading, form, currentRowData} = props
  const {id, name, role, description} = currentRowData
  const formItemLayout = {
    labelCol: {
      sm: {span: 4},
    },
    wrapperCol: {
      sm: {span: 16},
    },
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
        {...formItemLayout}
        initialValues={{
          id: id,
          name: name,
          role: role,
          description: description
        }}
        form={form}
      >
        <Form.Item
          label="用户ID:"
          name="id"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="用户名称:"
          name="name"
          rules={
            [
              {
                required: true, message: "请输入用户名称!"
              }
            ]
          }
        >
          <Input placeholder="请输入用户名称"/>
        </Form.Item>
        <Form.Item
          label="用户角色:"
          name="role"
        >
          <Select style={{width: 120}}>
            <Select.Option value="admin">admin</Select.Option>
            <Select.Option value="editor">admin</Select.Option>
            <Select.Option value="guest">guest</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="用户描述:"
          name="description"
        >
          <TextArea rows={4} placeholder="请输入用户描述"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserForm;
