import { transformHeaders, parseResponseHeaders } from '../../src/utils/headerUtils'
describe('header:uitls', () => {
  describe('transformHeaders', () => {
    test('should normalize Content-Type header name with no data and any method', () => {
      const headers: any = {
        'conTENT-TYPe': 'test'
      }
      transformHeaders(headers, {}, 'get')
      expect(headers['Content-Type']).toBe('test')
      expect(headers['conTenT-Type']).toBeUndefined()
    })

    test('should set Content-Type if not set and data is PlainObject with any method', () => {
      const headers: any = {}
      transformHeaders(headers, { a: 1 }, 'post')
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should set not Content-Type if not set and data is not PlainObject with any method', () => {
      const headers: any = {}
      transformHeaders(headers, 'test', 'delete')
      expect(headers['Content-Type']).toBeUndefined()
    })

    test('should do nothing if headers is undefined or null with any data or method', () => {
      expect(transformHeaders(undefined, { a: 1 }, 'get')).toBeUndefined()
      expect(transformHeaders(null, null, 'post')).toBeNull()
    })

    test('should flatten the headers and include common headers with data plainObject', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }

      expect(transformHeaders(headers, { a: 1 }, 'get')).toEqual({
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })

    test('should flatten the headers without common headers and no data', () => {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(transformHeaders(headers, undefined, 'patch')).toEqual({
        Accept: 'application/json'
      })
    })
  })

  describe('parse response headers', () => {
    test('should parse headers', () => {
      const header = parseResponseHeaders(
        'Content-Type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Transfer-Encoding: chunked\r\n' +
          'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
          ':aa\r\n' +
          'key:'
      )

      expect(header['content-type']).toBe('application/json')
      expect(header['connection']).toBe('keep-alive')
      expect(header['transfer-encoding']).toBe('chunked')
      expect(header['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(header['key']).toBe('')
    })

    test('should return empty object if headers is empty string', () => {
      expect(parseResponseHeaders('')).toEqual({})
    })
  })
})
