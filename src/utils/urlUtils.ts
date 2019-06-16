/**
 * url处理工具函数
 * dev：wyj
 * @type {Object}
 */
import { isDate, isObject, isUndefined, isNull, isURLSearchParams, isFunction } from './commonUtils'

/**
 * 转译函数
 * @param {String} val 转译字符串
 * @returns {String} 目标字符串
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '*')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 截取url中的hash标志
 * @param {String} url 请求地址
 * @returns {String} 截取之后的地址
 */
function removeHash(url: string): string {
  const index = url.indexOf('#')
  if (index !== -1) {
    return url.slice(0, index)
  }
  return url
}
/**
 * 处理URLSearchParams类型的参数
 * @param {URLSearchParams} params URLSearchParams类型的参数
 * @returns {String} key=value类型的字符串
 */
function handleURLSearchParams(params: URLSearchParams) {
  return params.toString()
}
/**
 * 处理正常参数类型
 * @param {Object} params 参数对象
 * @returns {String} key=value类型的字符串
 */
function handleCommonParams(params: any): string {
  let paramList: string[] = []
  for (let key of Object.keys(params)) {
    let val = params[key]

    if (isNull(val) || isUndefined(val)) {
      continue
    }

    if (Array.isArray(val)) {
      key += '[]'
    } else {
      val = [val]
    }

    for (let valItem of val) {
      if (isDate(valItem)) {
        valItem = valItem.toISOString()
      } else if (isObject(valItem)) {
        valItem = JSON.stringify(valItem)
      }

      paramList.push(`${encode(key)}=${encode(valItem)}`)
    }
  }
  return paramList.join('&')
}

/**
 * 构建url函数
 * @param {String} url 请求地址
 * @param {Object} params 参数对象
 * @param {Function} paramsSerializer 自定义序列化url参数方法
 * @returns {String} 构建url
 */
function buildUrl(url: string, params?: any, paramsSerializer?: Function): string {
  if (!params) {
    return url
  }

  let serializedParams: string = ''
  if (paramsSerializer && isFunction(paramsSerializer)) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = handleURLSearchParams(params)
  } else {
    serializedParams = handleCommonParams(params)
  }

  if (serializedParams) {
    url = removeHash(url)
    url += (url.indexOf('?') !== -1 ? '?' : '&') + serializedParams
  }

  return url
}

export { buildUrl }
