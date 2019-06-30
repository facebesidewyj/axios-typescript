/**
 * xhr发送函数
 * dev：wyj
 * @type {Object}
 */
import { AxiosPromise } from '../interfaces/AxiosPromise'
import { AxiosRequestConfig } from '../interfaces/AxiosRequestConfig'
import { AxiosResponse } from '../interfaces/AxiosResponse'
import { isNull } from './../utils/commonUtils'
import { parseResponseHeaders } from './../utils/headerUtils'
import { createError } from './../entities/AxiosError'
import config from './../config/config'

function xhr(requestConfig: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, headers, method = 'get', responseType, timeout = 0 } = requestConfig
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.open(method.toUpperCase(), url, true)

    xhr.timeout = timeout

    xhr.onreadystatechange = function handleLoad() {
      if (!xhr || xhr.readyState !== 4) {
        return
      }

      // 请求出错（网络错误或超时）status为0
      if (xhr.status === 0) {
        return
      }

      const headers =
        'getAllResponseHeaders' in xhr ? parseResponseHeaders(xhr.getAllResponseHeaders()) : null

      const data = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
      const response = {
        data,
        headers,
        status: xhr.status,
        statusText: xhr.statusText,
        requestConfig,
        request: xhr
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(response)
      } else {
        reject(
          createError({
            message: `Request failed with status code ${response.status}`,
            requestConfig,
            code: null,
            request: xhr,
            response
          })
        )
      }
    }

    xhr.onerror = function handleError() {
      reject(
        createError({
          message: 'Network Error',
          requestConfig,
          code: null,
          request: xhr
        })
      )
    }

    xhr.ontimeout = function handleTimeout() {
      reject(
        createError({
          message: `Timeout of ${timeout} ms exceeded`,
          requestConfig,
          code: 'ECONNABORTED',
          request: xhr
        })
      )
    }

    for (const key of Object.keys(headers)) {
      if (isNull(data) && key === config.CONTENT_TYPE) {
        delete headers[key]
      } else {
        xhr.setRequestHeader(key, headers[key])
      }
    }

    xhr.send(data)
  })
}

export { xhr }
