import Cookies from "js-cookie"

const TokenKey = 'Token'

/**
 * 获取token
 * @returns {string}
 */

export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * cookie储存token
 * @param token
 * @returns {string}
 */

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 清除token
 */

export function removeToken() {
  return Cookies.remove(TokenKey)
}