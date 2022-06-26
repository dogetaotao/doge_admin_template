import store from "../store"
import {Modal} from "antd";
import {getToken} from "./auth";
import axios from "axios";
import {logout} from "../store/actions"

//封装axios
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getState().user.token) {
      // 让每个请求携带token-- ['Authorization']为自定义key
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("err" + error)
    const {status} = error.response
    if (status === 403) {
      Modal.confirm({
        title: "确定登出？",
        content:
          "由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录",
        okText: "重新登录",
        cancelText: "取消",
        onOk() {
          let token = store.getState().user.token
          store.dispatch(logout(token))
        },
        onCancel() {
          console.log("Cancel")
        }
      })
    }
    return Promise.reject(error)
  }
)

export default service
