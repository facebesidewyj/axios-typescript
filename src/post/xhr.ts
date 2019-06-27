/**
 * xhr发送函数
 * dev：wyj
 * @type {Object}
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './../interfaces'
import { isNull } from './../utils/commonUtils'
import { parseResponseHeaders } from './../utils/headerUtils'
import config from './../config/config'

function xhr(requestConfig: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, headers, method = 'get', responseType } = requestConfig
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.open(method.toUpperCase(), url, true)

    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4) {
        return
      }

      resolve({
        data: responseType && responseType !== 'text' ? xhr.response : xhr.responseText,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
        requestConfig,
        request: xhr
      })
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
