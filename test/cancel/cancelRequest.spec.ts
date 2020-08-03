import { getAjaxRequest } from '../utils'
import axios from '../../src/index'
import { Cancel } from '../../src/entities'

describe('cancel 请求单元测试', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('在发送请求之前调用 cancel 方法，直接返回 Promise reject', () => {
    const cancelToken = axios.CancelToken
    const cancelObj = cancelToken.source()
    cancelObj.cancel('test cancel')

    return axios('/test', { cancelToken: cancelObj.token }).catch(error => {
      expect(error).toEqual(expect.any(Cancel))
      expect(error.message).toBe('test cancel')
    })
  })
  test('在发送请求之后调用 cancel 方法，返回 Promise reject，并且请求状态为 abort', done => {
    const cancelToken = axios.CancelToken
    const cancelObj = cancelToken.source()
    let req: any

    getAjaxRequest().then(request => {
      cancelObj.cancel('test cancel')
      req = request
    })

    axios('/test', { cancelToken: cancelObj.token }).catch(error => {
      expect(error).toEqual(expect.any(Cancel))
      expect(error.message).toBe('test cancel')
      expect(req.statusText).toBe('abort')
      done()
    })
  })
  test('在接收到返回结果之后调用 cancel 方法，未触发 unhandledrejection 事件', done => {
    const cancelToken = axios.CancelToken
    const cancelObj = cancelToken.source()

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'ok'
      })
    })

    axios('/test').then(res => {
      window.addEventListener('unhandledrejection', () => {
        // 表示异常结束，未触发表示用例成功
        done.fail('unhandledrejection')
      })
      cancelObj.cancel('test cancel')
      setTimeout(done, 100)
    })
  })
})
