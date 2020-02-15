import { AxiosRequestConfig } from './../interfaces'
import { CONTENT_TYPE, METHODS } from './config'
import { transformData, parseResponseData } from './../utils/dataUtils'
import { transformHeaders } from './../utils/headerUtils'
import { Method } from '../types/Method'

/**
 * defaults默认config对象
 * @type {AxiosRequestConfig}
 */
const defaults: AxiosRequestConfig = {
  timeout: 0,
  method: 'get',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any, method: Method) {
      return transformData(data)
    }
  ],
  transformResponse: [
    function(data: any) {
      return parseResponseData(data)
    }
  ],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

// 遍历请求方法添加默认请求头
METHODS.forEach(key => {
  defaults.headers[key] = {}
  if (['post', 'patch', 'put'].indexOf(key) !== -1) {
    defaults.headers[key][CONTENT_TYPE] = 'application/x-www-form-urlencoded'
  }
})

export default defaults
