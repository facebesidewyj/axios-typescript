import axios from '../../src/index'
import { getAjaxRequest } from './../utils'
import { AxiosResponse } from '../../src/interfaces'

function testHeaderVal(headers: any, key: string, val?: string) {
  let found = false
  for (const k in headers) {
    if (k.toLowerCase() === key.toLowerCase()) {
      found = true
      expect(headers[k]).toBe(val)
      break
    }
  }

  if (!found) {
    if (typeof val === 'undefined') {
      expect(headers.hasOwnProperty(key)).toBeFalsy()
    } else {
      throw new Error(key + ' was not found in headers')
    }
  }
}

describe('headers', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should use default common headers', () => {
    const headers = axios.defaults.headers.common

    axios('/test')

    return getAjaxRequest().then(req => {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(req.requestHeaders[key]).toEqual(headers[key])
        }
      }
    })
  })

  test('should add extra headers for post', () => {
    axios.post('/test', 'a=1')
    return getAjaxRequest().then(req => {
      testHeaderVal(req.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should use application/json when posting an object', () => {
    axios.post('/test', { a: 1 })

    return getAjaxRequest().then(req => {
      testHeaderVal(req.requestHeaders, 'Content-Type', 'application/json;charset=utf-8')
    })
  })

  test('should remove content-type if data is empty', () => {
    axios.post('/test')

    return getAjaxRequest().then(req => {
      testHeaderVal(req.requestHeaders, 'Content-Type', undefined)
    })
  })

  test('should preserve content-type if data is false', () => {
    axios.post('/test', false)

    return getAjaxRequest().then(req => {
      testHeaderVal(req.requestHeaders, 'Content-Type', 'application/x-www-form-urlencoded')
    })
  })

  test('should remove content-type if data is FormData', () => {
    const data = new FormData()
    data.append('a', '1')

    axios.post('/test', data)
    return getAjaxRequest().then(req => {
      testHeaderVal(req.requestHeaders, 'Content-Type', undefined)
    })
  })
})
