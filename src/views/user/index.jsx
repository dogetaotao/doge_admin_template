import React, {useEffect, useState} from 'react';
import {Card, Button, Table, message, Divider, Form} from "antd";
import {getUsers, editUser, addUser, deleteUser} from "../../api/user"
import EditUserForm from "./forms/edit-user-form";
import AddUserForm from "./forms/add-user-form";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Column} = Table

const User = () => {

  const [users, setUsers] = useState([])
  const [editUserModalVisible, setEditUserModalVisible] = useState(false)
  const [editUserModalLoading, setEditUserModalLoading] = useState(false)
  const [addUserModalVisible, setAddUserModalVisible] = useState(false)
  const [addUserModalLoading, setAddUserModalLoading] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({})

  const [editForm] = Form.useForm()
  const [addForm] = Form.useForm()

  const getUserList = async () => {
    const result = await getUsers()
    const {users, status} = result.data
    if (status === 0) {
      setUsers(users)
    }
  }

  const handleEditUser = (row) => {
    setCurrentRowData(Object.assign({}, row))
    editForm.setFieldsValue({
      id: row.id,
      name: row.name,
      role: row.role,
      description: row.description
    })
    setEditUserModalVisible(true)
  }

  const handleDeleteUser = (row) => {
    const {id} = row
    if (id === "admin") {
      message.error("不可删除管理员用户!")
      return
    }
    deleteUser({id}).then(res => {
      message.success("删除成功")
      getUserList()
    })
  }

  const handleEditUserOk = (_) => {
    editForm.validateFields().then((value) => {
      setEditUserModalLoading(true)
      editUser(value).then(response => {
        editForm.resetFields()
        setEditUserModalVisible(false)
        setEditUserModalLoading(false)
        message.success("编辑用户成功!")
        getUserList()
      })
    }).catch(err => {
      message.success("编辑失败!")
    })
  }

  const handleCancel = (_) => {
    setAddUserModalVisible(false)
    setEditUserModalVisible(false)
  }

  const handleAddUser = (row) => {
    setAddUserModalVisible(true)
  }

  const handleAddUserOk = (_) => {
    addForm.validateFields().then(value => {
      setAddUserModalLoading(true)
      addUser(value).then(response => {
        addForm.resetFields()
        setAddUserModalLoading(false)
        setAddUserModalVisible(false)
        message.success("添加用户成功!")
        getUserList()
      })
    }).catch(err => {
      message.error("添加失败，请重试!")
    })
  }

  useEffect(() => {
    getUserList()
  }, [])

  const title = (
    <span>
      <span>用户管理</span>
      <Button type='primary' onClick={handleAddUser} style={{position: "absolute", right: "30px"}}>添加用户</Button>
    </span>)

  return (
    <div className="app-container">
      <Card title={title}>
        <Table
          bordered
          rowKey="id"
          dataSource={users}
          pagination={false}
        >
          <Column title="用户ID" dataIndex="id" key="id" align="center"/>
          <Column title="用户名称" dataIndex="name" key="name" align="center"/>
          <Column title="用户角色" dataIndex="role" key="role" align="center"/>
          <Column title="用户描述" dataIndex="description" key="description" align="center"/>
          <Column title="操作" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" title="编辑" onClick={handleEditUser.bind(null,row)} icon={<EditOutlined />}/>
              <Divider type="vertical"/>
              <Button type="primary" shape="circle" title="删除" onClick={handleDeleteUser.bind(null,row)} icon={<DeleteOutlined />}/>
            </span>
          )}/>
        </Table>
      </Card>
      <AddUserForm
        visible={addUserModalVisible}
        confirmLoading={addUserModalLoading}
        onCancel={handleCancel}
        onOk={handleAddUserOk}
        form={addForm}
      />
      <EditUserForm
        currentRowData={currentRowData}
        visible={editUserModalVisible}
        confirmLoading={editUserModalLoading}
        onCancel={handleCancel}
        onOk={handleEditUserOk}
        form={editForm}
      />

    </div>
  )
}

export default User;
