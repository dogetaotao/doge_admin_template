import request from "../utils/request";

/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */

export function reqLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 登出
 * @param data
 * @returns {AxiosPromise}
 */

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}