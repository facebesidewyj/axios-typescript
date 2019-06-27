/**
 * 请求头和响应头处理函数
 * dev：wyj
 */
import config from './../config/config'
import { isPlainObject } from './commonUtils'

/**
 * 规范请求头名称
 * @param {Object} headers 请求头对象
 * @param {String} normalizeName 规范化名称
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  for (const key of Object.keys(headers)) {
    // 名称含义相同，但是大小写不同（header大小写不敏感）
    if (key !== normalizeName && key.toLowerCase() === normalizeName.toLowerCase()) {
      headers[normalizeName] = headers[key]
      delete headers[key]
    }
  }
}

/**
 * 请求头转换函数
 * @param {Object} headers 请求头对象
 * @param {Object} data 请求参数对象
 * @returns {Object} 转换后的请求头对象
 */
function transformHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, config.CONTENT_TYPE)

  // 默认给有参数对象的请求添加json请求头
  if (isPlainObject(data) && !headers[config.CONTENT_TYPE]) {
    headers[config.CONTENT_TYPE] = 'application/json;charset=UTF-8'
  }
  return headers
}
/**
 * 响应头解析函数
 * @param {String} headers 响应头字符串
 * @returns {Object} 转换后的响应头对象
 */
function parseResponseHeaders(headers: string): any {
  let res = Object.create(null)
  if (!headers) {
    return res
  }

  for (const header of headers.split('/r/n')) {
    let [key, val] = header.split(':')

    if (key) {
      key = key.trim().toLowerCase()
    }

    if (val) {
      val = val.trim()
    }
    res[key] = val
  }
  return res
}
export { transformHeaders, parseResponseHeaders }