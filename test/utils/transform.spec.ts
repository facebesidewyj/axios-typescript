import { transform } from '../../src/utils/transform'

describe('transform 单元测试', () => {
  test('transform 会批量执行传入的函数，并且会每次第一个函数执行的返回值作为下一个函数执行的入参', () => {
    const data = { a: 1 }
    const header = { b: 1 }
    const fn1 = jest.fn(data => {
      return {
        ...data,
        c: 1
      }
    })
    const fn2 = jest.fn(data => {
      return data
    })
    const res = transform(data, header, [fn1, fn2])
    expect(fn1).toHaveBeenCalledWith(data, header)
    expect(fn2).toHaveBeenCalledWith({ ...data, c: 1 }, header)
    expect(res).toEqual({ ...data, c: 1 })
  })
  test('transform 未传入执行函数，直接返回 data 参数', () => {
    const data = { a: 1 }
    const header = { b: 1 }
    const res = transform(data, header)
    expect(res).toEqual(data)
  })
  test('transform 也可以只接收一个执行函数', () => {
    const data = { a: 1 }
    const header = { b: 1 }
    const fn = jest.fn(() => {
      return 'test'
    })
    const res = transform(data, header, fn)
    expect(res).toBe('test')
  })
})
