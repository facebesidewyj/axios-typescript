/**
 * 请求头和响应头处理函数
 * dev：wyj
 */
import { CONTENT_TYPE, METHODS } from './../config'
import { isPlainObject, deepMerge } from './commonUtils'
import { Method } from '../types/Method'

/**
 * 规范请求头名称
 * @param {Object} headers 请求头对象
 * @param {String} normalizeName 规范化名称
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }

  for (const key of Object.keys(headers)) {
    // 名称含义相同，但是大小写不同（header大小写不敏感）
    if (key !== normalizeName && key.toLowerCase() === normalizeName.toLowerCase()) {
      headers[normalizeName] = headers[key]
      delete headers[key]
    }
  }
}

/**
 * 扁平化Header对象(default配置中header的请求方式对应的是对象)
 * @param {Object} headers 处理之前的请求头
 * @param {Method} method 请求方法
 * @returns {Object} 转换后的请求头对象
 */
function flattenHeaders(headers: any, method: Method) {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = METHODS.concat('common')
  methodsToDelete.forEach(method => {
    if (headers[method]) {
      delete headers[method]
    }
  })

  return headers
}

/**
 * 请求头转换函数
 * @param {Object} headers 请求头对象
 * @param {Object} data 请求参数对象
 * @param {Method} method 请求方法(可选参数flattenHeaders方法里面有判空)
 * @returns {Object} 转换后的请求头对象
 */
function transformHeaders(headers: any, data: any, method: Method): any {
  normalizeHeaderName(headers, CONTENT_TYPE)

  // 默认给有参数对象的请求添加json请求头
  if (isPlainObject(data) && headers && !headers[CONTENT_TYPE]) {
    headers[CONTENT_TYPE] = 'application/json;charset=utf-8'
  }

  return flattenHeaders(headers, method)
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

  for (const header of headers.split('\r\n')) {
    let [key, ...vals] = header.split(':')

    if (key) {
      key = key.trim().toLowerCase()

      let val = vals.join(':')
      if (val) {
        val = val.trim()
      }
      res[key] = val
    }
  }
  return res
}

export { transformHeaders, parseResponseHeaders }
