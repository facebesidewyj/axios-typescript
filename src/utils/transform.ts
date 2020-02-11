import { AxiosTransformer } from './../interfaces/AxiosTransformer'
/**
 * 转换函数
 * @param {Object} data 请求体
 * @param {Object} headers 请求头
 * @returns {Object} 处理之后的data对象
 */
export function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
