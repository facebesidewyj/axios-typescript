import axios from '../../src/index'
import { getAjaxRequest } from './../utils'
import { AxiosResponse, AxiosRequestConfig } from '../../src/interfaces'

describe('interceptor', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a request interceptor', () => {
    const axiosIntance = axios.create()

    axiosIntance.interceptorDispatch.request.use({
      resolved: (config: AxiosRequestConfig) => {
        config.headers.test = 'test'
        return config
      }
    })

    axiosIntance('/test')

    return getAjaxRequest().then(req => {
      expect(req.requestHeaders.test).toBe('test')
    })
  })

  test('should add a request interceptor that returns a new config object', () => {
    const axiosIntance = axios.create()

    axiosIntance.interceptorDispatch.request.use({
      resolved: (config: AxiosRequestConfig) => {
        return {
          url: '/test1',
          method: 'post'
        }
      }
    })

    axiosIntance('/test')

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/test1')
      expect(req.method).toBe('POST')
    })
  })

  test('should add a request interceptor that returns a promise', done => {
    const axiosIntance = axios.create()

    axiosIntance.interceptorDispatch.request.use({
      resolved: (config: AxiosRequestConfig) => {
        return new Promise(resolve => {
          setTimeout(() => {
            config.headers.async = 'promise'
            resolve(config)
          }, 10)
        })
      }
    })

    axiosIntance('/test')

    setTimeout(() => {
      getAjaxRequest().then(req => {
        expect(req.requestHeaders.async).toBe('promise')
        done()
      })
    }, 100)
  })

  test('should add multiple request interceptors', () => {
    const axiosIntance = axios.create()

    axiosIntance.interceptorDispatch.request.use({
      resolved: (config: AxiosRequestConfig) => {
        config.headers.test1 = 'test1'
        return config
      }
    })
    axiosIntance.interceptorDispatch.request.use({
      resolved: (config: AxiosRequestConfig) => {
        config.headers.test2 = 'test2'
        return config
      }
    })
    axiosIntance.interceptorDispatch.request.use({
      resolved: (config: AxiosRequestConfig) => {
        config.headers.test3 = 'test3'
        return config
      }
    })

    axiosIntance('/test')

    return getAjaxRequest().then(req => {
      expect(req.requestHeaders.test1).toBe('test1')
      expect(req.requestHeaders.test2).toBe('test2')
      expect(req.requestHeaders.test3).toBe('test3')
    })
  })

  test('should add a response interceptor', done => {
    let response: AxiosResponse
    const axiosIntance = axios.create()
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test'
        return res
      }
    })

    axiosIntance('/test').then(res => {
      response = res
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        responseText: 'ok'
      })

      setTimeout(() => {
        expect(response.data).toBe('oktest')
        done()
      }, 10)
    })
  })

  test('should add a response interceptor that returns a new data object', done => {
    let response: AxiosResponse
    const axiosIntance = axios.create()
    axiosIntance.interceptorDispatch.response.use({
      resolved: () => {
        return {
          data: 'test',
          statusText: 'test',
          status: 400,
          requestConfig: {}
        } as AxiosResponse
      }
    })

    axiosIntance('/test').then(res => {
      response = res
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        statusText: 'ok'
      })

      setTimeout(() => {
        expect(response.data).toBe('test')
        expect(response.statusText).toBe('test')
        expect(response.status).toBe(400)
        expect(response.requestConfig).toEqual({})
        done()
      }, 10)
    })
  })

  test('should add a response interceptor that returns a promise', done => {
    let response: AxiosResponse
    const axiosIntance = axios.create()
    axiosIntance.interceptorDispatch.response.use({
      resolved: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              data: 'test',
              statusText: 'test',
              status: 400,
              requestConfig: {}
            } as AxiosResponse)
          }, 10)
        })
      }
    })

    axiosIntance('/test').then(res => {
      response = res
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        statusText: 'ok'
      })

      setTimeout(() => {
        expect(response.data).toBe('test')
        expect(response.statusText).toBe('test')
        expect(response.status).toBe(400)
        expect(response.requestConfig).toEqual({})
        done()
      }, 100)
    })
  })

  test('should add multiple response interceptors', done => {
    let response: AxiosResponse
    const axiosIntance = axios.create()
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test'
        return res
      }
    })
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test1'
        return res
      }
    })
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test2'
        return res
      }
    })
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test3'
        return res
      }
    })

    axiosIntance('/test').then(res => {
      response = res
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        responseText: 'ok'
      })

      setTimeout(() => {
        expect(response.data).toBe('oktesttest1test2test3')
        done()
      }, 10)
    })
  })

  test('should allow removing interceptors', done => {
    let response: AxiosResponse
    let interceptor
    const axiosIntance = axios.create()
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test'
        return res
      }
    })
    interceptor = axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test1'
        return res
      }
    })
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test2'
        return res
      }
    })
    axiosIntance.interceptorDispatch.response.use({
      resolved: res => {
        res.data = res.data + 'test3'
        return res
      }
    })

    axiosIntance.interceptorDispatch.response.eject(interceptor)

    axiosIntance('/test').then(res => {
      response = res
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        responseText: 'ok'
      })

      setTimeout(() => {
        expect(response.data).toBe('oktesttest2test3')
        done()
      }, 10)
    })
  })
})
