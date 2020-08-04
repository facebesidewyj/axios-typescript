import axios from '../../src/index'
import { getAjaxRequest } from './../utils'
import { AxiosResponse, AxiosRequestConfig } from '../../src/interfaces'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () => {
    const instance = axios.create()

    instance('/test')

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/test')
    })
  })

  test('should make a http request', () => {
    const instance = axios.create()

    instance.get('/test')

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/test')
      expect(req.method).toBe('GET')
    })
  })

  test('should make a post request', () => {
    const instance = axios.create()

    instance.post('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('POST')
    })
  })

  test('should make a put request', () => {
    const instance = axios.create()

    instance.put('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('PUT')
    })
  })

  test('should make a patch request', () => {
    const instance = axios.create()

    instance.patch('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('PATCH')
    })
  })

  test('should make a options request', () => {
    const instance = axios.create()

    instance.options('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () => {
    const instance = axios.create()

    instance.delete('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('DELETE')
    })
  })

  test('should make a head request', () => {
    const instance = axios.create()

    instance.head('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('HEAD')
    })
  })

  test('should use instance options', () => {
    const instance = axios.create({ timeout: 2000 })

    instance.get('/test')

    return getAjaxRequest().then(req => {
      expect(req.method).toBe('GET')
      expect(req.timeout).toBe(2000)
    })
  })

  test('should have defaults.headers', () => {
    const instance = axios.create()

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance', done => {
    axios.interceptorDispatch.request.use({
      resolved: config => {
        config.timeout = 2000
        return config
      }
    })

    const instance = axios.create()

    instance.interceptorDispatch.request.use({
      resolved: config => {
        config.withCredentials = true
        return config
      }
    })

    let res: AxiosResponse
    instance.get('/test').then(response => {
      res = response
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200
      })

      setTimeout(() => {
        expect(res.requestConfig.timeout).toEqual(0)
        expect(res.requestConfig.withCredentials).toEqual(true)
        done()
      }, 100)
    })
  })
  test('config 中的 baseUrl 有值，并且 url 是相对地址时，会根据 baseUrl 进行拼接', () => {
    const axiosInstance = axios.create({ baseURL: 'base' })
    axiosInstance('/test')
    return getAjaxRequest().then(req => {
      expect(req.url).toBe('base/test')
    })
  })
})
