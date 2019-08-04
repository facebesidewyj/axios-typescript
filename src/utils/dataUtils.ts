/**
 * 请求参数和响应数据工具函数
 * dev：wyj
 */
import { isPlainObject, isURLSearchParams, isArrayBufferView, isString } from './commonUtils'

/**
 * data转换器
 * @param {Object} data 参数对象
 * @returns {Any} Json字符串或未转换的参数对象
 */
function transformData(data: any): any {
  if (isURLSearchParams(data)) {
    return data.toString()
  }

  if (isArrayBufferView(data)) {
    return data.buffer
  }

  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
/**
 * 响应数据解析器
 * @param {Object} data 响应数据
 * @returns {Object} Json对象
 */
function parseResponseData(data: any): any {
  if (isString(data)) {
    try {
      data = JSON.parse(data)
    } catch (error) {
      console.error(error)
    }
  }
  return data
}

export { transformData, parseResponseData }
