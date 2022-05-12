import React, {useState} from "react";
import {Form, Input, Button, message, Spin} from "antd";
import {connect} from "react-redux";
import DocumentTitle from "react-document-title"
import {login, getUserInfo} from "../../store/actions";
import {
  UserOutlined,
  LockOutlined
} from "@ant-design/icons"
import "./index.less"


const Login = (props) => {
  const {token, login, getUserInfo} = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleLogin = (username, password) => {
    setLoading(true)
    login(username, password)
      .then((data) => {
        message.success('登录成功')
        handleUserInfo(data.token)
      })
      .catch((error) => {
        setLoading(false)
        message.error(error)
      })
  }

  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const handleSubmit = () => {
    //对所有表单字段进行检验
    form.validateFields().then(values => {
      if (values) {
        const {username, password} = values
        handleLogin(username, password)
      } else {
        console.log('检验失败')
      }
    })
  }

  //如果登录的有用户，就无法进入login界面
  // if (token) {
  //   return <Navigate to="/dashboard"/>
  // }

  return (
    <DocumentTitle title='用户登录'>
      <div className='login-container'>
        <Form form={form} onFinish={handleSubmit} className='content'>
          <div className='title'>
            <h2>用户登录</h2>
          </div>
          <Spin spinning={loading} tip='登录中...'>
            <Form.Item
              name='username'
              rules={
              [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入用户名',
                }
              ]
            }>
              <Input
                prefix={
                  <UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>
                }/>
            </Form.Item>
            <Form.Item initialValue='123456' name='password' rules={
              [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入密码',
                }
              ]
            }>
              <Input prefix={
                <LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>
              }/>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登录
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  )
}

export default connect((state) => state.user, {login, getUserInfo})(Login)
