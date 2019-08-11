import { AxiosRequestConfig } from './../interfaces'
import { CONTENT_TYPE, METHODS } from './config'

/**
 * defaults默认config对象
 * @type {AxiosRequestConfig}
 */
const defaults: AxiosRequestConfig = {
  timeout: 0,
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
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
