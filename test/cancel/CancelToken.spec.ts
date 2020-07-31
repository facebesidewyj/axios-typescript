import { CancelToken, Cancel } from '../../src/entities'
import { CancelExecutor, Canceler } from '../../src/interfaces'

describe('CancelToken 类单元测试', () => {
  test('CancelToken 实例中有 reason 和 promise 属性，reason 对象在传入函数执行时实例化为 Cancel 实例', () => {
    const cancelExecutor: CancelExecutor = (resolve: Canceler) => {
      resolve('test')
    }
    const cancelToken = new CancelToken(cancelExecutor)
    expect(cancelToken.promise).toEqual(expect.any(Promise))
    expect(cancelToken.reason).toEqual(expect.any(Cancel))
    expect(cancelToken.reason!.message).toBe('test')
  })
  test('CancelToken 实例中有 reason 和 promise 属性，promise 执行时会将 Cancel 实例传回', done => {
    const cancelExecutor: CancelExecutor = (resolve: Canceler) => {
      resolve('test')
    }
    const cancelToken = new CancelToken(cancelExecutor)
    cancelToken.promise.then(value => {
      expect(value).toEqual(expect.any(Cancel))
      expect(value!.message).toBe('test')
      done()
    })
  })
  test('CancelToken 传入函数执行时会将传回一个函数入参，函数入参可以被多次执行，但是 Cancel 不会多次实例化', () => {
    let canceler: Canceler
    const cancelExecutor: CancelExecutor = (resolve: Canceler) => {
      canceler = resolve
    }
    const cancelToken = new CancelToken(cancelExecutor)

    canceler!('test1')
    canceler!('test2')
    canceler!('test3')

    expect(cancelToken.reason).toEqual(expect.any(Cancel))
    expect(cancelToken.reason!.message).toBe('test1')
  })
  test('CancelToken 静态方法 source 执行时，会返回 CancelToken 实例和 cancel 执行方法，cancel 方法执行时会创建 Cancel 实例', () => {
    const cancelTokenSource = CancelToken.source()
    expect(cancelTokenSource.token).toEqual(expect.any(CancelToken))
    expect(cancelTokenSource.cancel).toEqual(expect.any(Function))
    expect(cancelTokenSource.token.reason).toBeUndefined()
    cancelTokenSource.cancel('test')
    expect(cancelTokenSource.token.reason).toEqual(expect.any(Cancel))
    expect(cancelTokenSource.token.reason!.message).toBe('test')
  })
  test('CancelToken 实例中有 throwIfRequested 来判断 CancelToken 实例是否又被使用过，如果使用过会抛出异常', () => {
    const cancelExecutor: CancelExecutor = (resolve: Canceler) => {
      resolve('test')
    }
    const cancelToken = new CancelToken(cancelExecutor)
    try {
      cancelToken.throwIfRequested()
    } catch (error) {
      expect(error.message).toBe('test')
    }
  })
})
