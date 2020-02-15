import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './../interfaces'
import { buildURL, isAbsoluteURL, combineURL } from './../utils/urlUtils'
import { transformData } from './../utils/dataUtils'
import { xhr } from './../post/xhr'
import { transform } from './../utils/transform'
import { transformHeaders } from '../utils/headerUtils'

/**
 * http请求函数
 * @param {AxiosRequestConfig} config 配置对象
 */
export function http(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    response => {
      return transformResponse(response)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponse(e.response)
      }
      return Promise.reject(e)
    }
  )
}

/**
 * cancelToken被使用过，直接抛出异常
 * @param {AxiosRequestConfig} config 配置对象
 */
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

/**
 * 配置对象预处理函数
 * @param {AxiosRequestConfig} config 配置对象
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config.headers, config.data, config.method!)
  config.data = transform(config.data, config.headers, config.transformRequest)
}

/**
 * url转换器
 * @param {AxiosRequestConfig} config 配置对象
 * @returns {String} 转换后的url
 */
function transformUrl(config: AxiosRequestConfig): string {
  let { url, baseURL, params, paramsSerializer } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }

  return buildURL(url!, params, paramsSerializer)
}

/**
 * 响应对象处理器
 * @param {AxiosResponse} response 响应对象
 * @returns {AxiosResponse} 处理后的响应对象
 */
function transformResponse(response: AxiosResponse): AxiosResponse {
  response.data = transform(
    response.data,
    response.headers,
    response.requestConfig.transformResponse
  )
  return response
}
