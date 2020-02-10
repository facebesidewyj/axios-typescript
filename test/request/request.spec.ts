import axios from '../../src/index'
import { getAjaxRequest } from './../utils'
import { AxiosErrorConfig, AxiosResponse } from '../../src/interfaces'

describe('request', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should treat single string arg as url', () => {
    axios('/test')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/test')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', done => {
    axios({ url: '/test', method: 'post' }).then(response => {
      expect(response.requestConfig.method).toBe('post')
      done()
    })

    getAjaxRequest().then(request => {
      expect(request.respondWith({ status: 200 }))
    })
  })

  test('should reject on network errors', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((e: AxiosErrorConfig) => {
      return e
    })

    jasmine.Ajax.uninstall()

    axios('/test')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(e: AxiosResponse | AxiosErrorConfig) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(e instanceof Error).toBeTruthy()
      expect((e as AxiosErrorConfig).message).toBe('Network Error')
      expect(e.request).toEqual(expect.any(XMLHttpRequest))
    }

    jasmine.Ajax.install()

    done()
  })

  test('should reject when request timeout', done => {
    let err: AxiosErrorConfig

    axios('/test', {
      timeout: 2000,
      method: 'post'
    }).catch(error => {
      err = error
    })

    getAjaxRequest().then(res => {
      // @ts-ignore
      res.eventBus.trigger('timeout')
      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 100)
    })
  })

  test('should reject when validateStatus returns false', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((err: AxiosErrorConfig) => {
      return err
    })

    axios('/test', {
      validateStatus(status) {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    getAjaxRequest().then(res => {
      res.respondWith({
        status: 500
      })
    })

    function next(err: AxiosResponse | AxiosErrorConfig) {
      expect(err instanceof Error).toBeTruthy()
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect((err as AxiosErrorConfig).message).toBe('Request failed with status code 500')
      expect((err as AxiosErrorConfig).response!.status).toBe(500)

      done()
    }
  })

  test('should return JSON when resolved', done => {
    let res: AxiosResponse

    axios('/test', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      res = response
    })

    getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"a":1}'
      })

      setTimeout(() => {
        expect(res.data).toEqual({ a: 1 })
        done()
      }, 100)
    })
  })
})
