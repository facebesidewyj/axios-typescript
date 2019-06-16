/**
 * xhr发送函数
 * dev：wyj
 * @type {Object}
 */
import { AxiosRequestConfig } from './../interfaces'

function xhr(config: AxiosRequestConfig): void {
  const { url, data = null, method = 'get' } = config
  const xhr = new XMLHttpRequest()
  xhr.open(method.toUpperCase(), url, true)
  xhr.send(data)
}
export { xhr }
