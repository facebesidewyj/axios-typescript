/**
 * 请求参数工具函数
 * dev：wyj
 */
import { isPlainObject, isURLSearchParams, isArrayBufferView } from './commonUtils'

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

export { transformData }
