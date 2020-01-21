import { readCookie } from '../../src/utils/cookieUtils'

describe('utils:cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=baz'
    expect(readCookie('foo')).toBe('baz')
  })
  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=baz'
    expect(readCookie('baz')).toBeNull()
  })
})
