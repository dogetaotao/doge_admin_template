import * as types from "../action-types"
import {reqUserInfo} from "../../api/user";

/**
 * 获取用户信息
 * @param token
 * @returns {function(*): Promise<unknown>}
 */

export const getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    //向指定地址发送请求,返回一个promise
    reqUserInfo(token)
      .then((response) => {
        const {data} = response
        if (data.status === 0) {
          const userInfo = data.userInfo
          dispatch(setUserInfo(userInfo))
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
 * 设置用户token
 * @param token
 * @returns {{type: string, token}}
 */

export const setUserToken = (token) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
  }
}

/**
 * 设置用户信息
 * @param userInfo
 * @returns {*&{type: string}}
 */

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo,
  }
}

/**
 * 重设用户信息
 * @returns {{type: string}}
 */

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER,
  }
}
