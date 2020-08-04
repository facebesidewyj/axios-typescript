import axios from '../src'
import { getAjaxRequest } from './utils'

describe('上传下载监听单元测试', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
  test('传入回调函数，当触发下载事件时，函数回被调用', () => {
    const fn = jest.fn()
    axios('/test', { onDownloadProgress: fn })
    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 200
      })
      expect(fn).toHaveBeenCalled()
    })
  })
  test.skip('传入回调函数，当触发上传事件时，函数回被调用', () => {
    const fn = jest.fn()
    // TODO 暂无法触发upload事件
    axios('/test', { onUploadProgress: fn })
    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 200
      })
      expect(fn).toHaveBeenCalled()
    })
  })
})
