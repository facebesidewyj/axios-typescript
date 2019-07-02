import { AxiosRequestConfig } from './../interfaces/AxiosRequestConfig'
import { AxiosResponse } from './../interfaces/AxiosResponse'
import { AxiosPromise } from './../interfaces/AxiosPromise'
import { buildUrl } from './../utils/urlUtils'
import { transformData, parseResponseData } from './../utils/dataUtils'
import { transformHeaders } from './../utils/headerUtils'
import { xhr } from './../post/xhr'

/**
 * http请求函数
 * @param {AxiosRequestConfig} config 配置对象
 */
export function http(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponse(response)
  })
}

/**
 * 配置对象预处理函数
 * @param {AxiosRequestConfig} config 配置对象
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * url转换器
 * @param {AxiosRequestConfig} config 配置对象
 * @returns {String} 转换后的url
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildUrl(url, params, paramsSerializer)
}

/**
 * 请求参数data处理器
 * @param {AxiosRequestConfig} config 配置对象
 * @returns {String} 转换后的Json字符串
 */
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformData(data)
}

/**
 * 请求头header处理器
 * @param {AxiosRequestConfig} config 配置对象
 * @returns {Object} 处理后的header对象
 */
function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return transformHeaders(headers, data)
}

/**
 * 响应对象处理器
 * @param {AxiosResponse} response 响应对象
 * @returns {AxiosResponse} 处理后的响应对象
 */
function transformResponse(response: AxiosResponse): AxiosResponse {
  response.data = parseResponseData(response.data)
  return response
}
