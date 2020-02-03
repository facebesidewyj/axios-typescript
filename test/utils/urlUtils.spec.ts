import { buildURL, isURLSameOrigin, isAbsoluteURL, combineURL } from './../../src/utils/urlUtils'

describe('url:utils', () => {
  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://www.baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })

    test('should return true if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://www.baidu.com')).toBeFalsy()
      expect(isAbsoluteURL(',.custom-scheme-v1.0://example.com/')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://www.baidu.com')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine url', () => {
      expect(combineURL('https://baidu.com', '/user')).toBe('https://baidu.com/user')
    })

    test('should not combine with empty url', () => {
      expect(combineURL('https://baidu.com', '')).toBe('https://baidu.com')
    })
  })

  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/test')).toBe('/test')
    })

    test('should support params', () => {
      expect(buildURL('/test', { a: 1 })).toBe('/test?a=1')
    })

    test('should ignore if some param value is null', () => {
      expect(
        buildURL('/test', {
          a: '1',
          b: null
        })
      ).toBe('/test?a=1')
    })

    test('should ignore if the only param value is null', () => {
      expect(
        buildURL('/test', {
          a: null
        })
      ).toBe('/test')
    })

    test('should support object params', () => {
      expect(
        buildURL('/test', {
          a: {
            b: '1'
          }
        })
      ).toBe('/test?a=' + encodeURI('{"b":"1"}'))
    })

    test('should support date params', () => {
      const date = new Date()

      expect(
        buildURL('/test', {
          date: date
        })
      ).toBe('/test?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(
        buildURL('/test', {
          foo: ['a', 'b']
        })
      ).toBe('/test?foo[]=a&foo[]=b')
    })

    test('should support special char params', () => {
      expect(
        buildURL('/foo', {
          foo: '@:$, '
        })
      ).toBe('/foo?foo=@:$,+')
    })

    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=bar', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=bar&bar=baz')
    })

    test('should correct discard url hash mark', () => {
      expect(
        buildURL('/foo?foo=bar#hash', {
          query: 'baz'
        })
      ).toBe('/foo?foo=bar&query=baz')
    })

    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'a=1'
      })
      const params = { b: 2 }
      expect(buildURL('/test', params, serializer)).toBe('/test?a=1')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })
})
