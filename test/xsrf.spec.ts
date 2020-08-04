import axios from '../src'
import { getAjaxRequest } from './utils'

describe('xsrf 请求单元测试', () => {
  const xsrfHeaderName = axios.defaults.xsrfHeaderName
  const xsrfCookieName = axios.defaults.xsrfCookieName
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie = `${xsrfCookieName}=;expires=${new Date(Date.now() - 86400000).toUTCString()}`
  })

  test('当 cookie 为 null 时，不设置请求 header', () => {
    axios('/test')
    return getAjaxRequest().then(req => {
      expect(req.requestHeaders[xsrfHeaderName!]).toBeUndefined()
    })
  })
  test('当 cookie 不为 null 时，且不跨域时，默认设置请求 header', () => {
    document.cookie = `${xsrfCookieName}=test`
    axios('/test')
    return getAjaxRequest().then(req => {
      expect(req.requestHeaders[xsrfHeaderName!]).toBe('test')
    })
  })
  test('当接口跨域时，默认不设置请求 header', () => {
    document.cookie = `${xsrfCookieName}=test`
    axios('https://www.test.com')
    return getAjaxRequest().then(req => {
      expect(req.requestHeaders[xsrfHeaderName!]).toBeUndefined()
    })
  })
  test('当接口跨域时，传入 withCredentials，设置请求 header', () => {
    document.cookie = `${xsrfCookieName}=test`
    axios('https://www.test.com', { withCredentials: true })
    return getAjaxRequest().then(req => {
      expect(req.requestHeaders[xsrfHeaderName!]).toBe('test')
    })
  })
})
