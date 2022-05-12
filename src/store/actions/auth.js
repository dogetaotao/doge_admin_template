import {setUserToken, resetUser} from "./user"
import {reqLogin, reqLogout} from "../../api/login"
import {setToken, removeToken} from "../../utils/auth";

/**
 * 登录
 * @param username
 * @param password
 * @returns {function(*): Promise<unknown>}
 */

export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({username: username.trim(), password: password})
      .then((response) => {
        const {data} = response
        if (data.status === 0) {
          const token = data.token
          dispatch(setUserToken(token))
          setToken(token)
          resolve(data)
        } else {
          const msg = data.message
          reject(msg)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 登出
 * @param token
 * @returns {function(*): Promise<unknown>}
 */

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((response) => {
        const {data} = response
        if (data.status === 0) {
          dispatch(resetUser())
          removeToken()
          resolve(data)
        } else {
          const msg = data.message
          reject(msg)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
