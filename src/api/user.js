import request from "../utils/request";

/**
 * 请求用户信息
 * @param data
 * @returns {AxiosPromise}
 */

export function reqUserInfo(data) {
  return request({
    url: '/userInfo',
    method: 'post',
    data
  })
}

/**
 * 获取用户
 * @returns {AxiosPromise}
 */

export function getUsers() {
  return request({
    url: '/user/list',
    method: 'get'
    }
  )
}

/**
 * 编辑用户
 * @param data
 * @returns {AxiosPromise}
 */

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

/**
 * req 验证用户 ID
 * @param data
 * @returns {AxiosPromise}
 */

export function reqValidatUserID(data) {
  return request({
    url:'/user/validatUserID',
    method: 'post',
    data
  })
}

/**
 * 添加用户
 * @param data
 * @returns {AxiosPromise}
 */

export function addUser(data) {
  return request({
    url: 'user/add',
    method: 'post',
    data
  })
}