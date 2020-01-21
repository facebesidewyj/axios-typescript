import {
  isDate,
  isObject,
  isPlainObject,
  isUndefined,
  isNull,
  isString,
  isURLSearchParams,
  isFunction,
  isFormData,
  isArrayBufferView,
  extend,
  deepMerge
} from '../../src/utils/commonUtils'

describe('utils:common', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate Object', () => {
      expect(isObject({ name: 'test' })).toBeTruthy()
      expect(isObject(null)).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject({ name: 'test' })).toBeTruthy()
      expect(isPlainObject(null)).toBeFalsy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate Undefined', () => {
      let a
      expect(isUndefined(undefined)).toBeTruthy()
      expect(isUndefined(a)).toBeTruthy()
      expect(isUndefined(null)).toBeFalsy()
      expect(isUndefined({})).toBeFalsy()
    })

    test('should validate Null', () => {
      expect(isNull(null)).toBeTruthy()
      expect(isNull(undefined)).toBeFalsy()
      expect(isNull({})).toBeFalsy()
    })

    test('should validate String', () => {
      expect(isString('')).toBeTruthy()
      expect(isString('test')).toBeTruthy()
      expect(isString(`test`)).toBeTruthy()
      expect(isString(1)).toBeFalsy()
      expect(isString(null)).toBeFalsy()
      expect(isString(undefined)).toBeFalsy()
      expect(isString({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams(undefined)).toBeFalsy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })

    test('should validate Function', () => {
      const test = function() {}
      expect(isFunction(test)).toBeTruthy()
      expect(isFunction({})).toBeFalsy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData(undefined)).toBeFalsy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate ArrayBufferView', () => {
      let buffer = new Int8Array()
      expect(isArrayBufferView(buffer)).toBeTruthy()
      expect(isArrayBufferView([1, 2, 3])).toBeFalsy()
      expect(isArrayBufferView(1)).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }
      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend properties', () => {
      const a = { foo: 123 }
      const b = { foo: 345, bar: 789 }
      const c = extend(a, b)

      expect(c.foo).toBe(345)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(a.foo).toBeUndefined()
      expect(a.bar).toBeUndefined()
      expect(b.bar).toBeUndefined()
      expect(c.foo).toBeUndefined()
    })

    test('should deepMerge properties', () => {
      const a = { foo: 123 }
      const b = { bar: 345 }
      const c = { foo: 987 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(987)
      expect(d.bar).toBe(345)
    })

    test('should deepMerge recursively', () => {
      const a: any = { foo: { bar: 123 } }
      const b: any = { foo: { baz: 345 }, bar: { qux: 567 } }

      const c = deepMerge(a, b)

      expect(c).toEqual({
        bar: { qux: 567 },
        foo: { bar: 123, baz: 345 }
      })
    })

    test('should remove all references from nested objects', () => {
      const a: any = { foo: { bar: 123 } }
      const b: any = {}

      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: { bar: 123 }
      })
      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
