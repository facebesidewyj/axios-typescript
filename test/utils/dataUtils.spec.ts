import { transformData, parseResponseData } from '../../src/utils/dataUtils'
describe('utils:data', () => {
  describe('transformData', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const a = { a: 1 }
      expect(transformData(a)).toBe('{"a":1}')
    })

    test('ohter empty', () => {
      const a = new URLSearchParams('a=1')
      expect(transformData(a)).toBe(a.toString())

      const b = new Uint16Array(10)
      expect(transformData(b)).toBe(b.buffer)

      const date = new Date()
      expect(transformData(date)).toBe(date)
    })
  })

  describe('parseResponseData', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const a = '{"a": 2}'
      expect(parseResponseData(a)).toEqual({ a: 2 })
    })

    test('should do nothing if data is a string but not a JSON string', () => {
      const a = 'test'
      expect(parseResponseData(a)).toBe('test')
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(parseResponseData(a)).toBe(a)
    })
  })
})
