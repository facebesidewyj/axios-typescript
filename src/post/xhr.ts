/**
 * xhr发送函数
 * dev：wyj
 * @type {Object}
 */
import { AxiosRequestConfig } from './../interfaces'
import { isNull } from './../utils/commonUtils'
import config from './../config/config'

function xhr(requestConfig: AxiosRequestConfig): void {
  const { url, data = null, headers, method = 'get' } = requestConfig
  const xhr = new XMLHttpRequest()
  xhr.open(method.toUpperCase(), url, true)

  for (const key of Object.keys(headers)) {
    if (isNull(data) && key === config.CONTENT_TYPE) {
      delete headers[key]
    } else {
      xhr.setRequestHeader(key, headers[key])
    }
  }

  xhr.send(data)
}

export { xhr }
