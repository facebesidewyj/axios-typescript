import { mergeConfig } from '../../src/utils/configUtils'
import { AxiosRequestConfig } from '../../src/interfaces'
import axios from '../../src'

describe('configUtils 文件单元测试', () => {
  const defaultConfig = axios.defaults
  test('mergeConfig 只接收默认配置 defaults 为第一个参数，第二个参数不传，返回 clone 后的默认配置对象 defaults', () => {
    const merge = mergeConfig(defaultConfig)
    expect(merge).toEqual(defaultConfig)
    expect(merge === defaultConfig).toBeFalsy()
  })
  test('mergeConfig 只接收默认配置 defaults 为第一个参数，第二个参数对象传入 url、params 和 data，返回对象的url、params 和 data 以第二个参数为准', () => {
    const config: AxiosRequestConfig = {
      url: 'test',
      params: 'testparams',
      data: { a: 1 }
    }
    const merge = mergeConfig(defaultConfig, config)
    expect(merge).not.toEqual(defaultConfig)
    expect(merge.url).toBe(config.url)
    expect(merge.params).toBe(config.params)
    expect(merge.data).toEqual(config.data)
  })
  test('mergeConfig 接收第一个参数中有url、params 和 data属性，返回对象中这些属性会为 undefined', () => {
    const config: AxiosRequestConfig = {
      url: 'test',
      params: 'testparams',
      data: { a: 1 }
    }
    const merge = mergeConfig(config)
    expect(merge.url).toBeUndefined()
    expect(merge.params).toBeUndefined()
    expect(merge.data).toBeUndefined()
  })
  test('mergeConfig 接收默认参数 defaults， 第二个参数对象中传入 headers 和 auth 属性为普通对象，返回结果中会做合并', () => {
    const config: AxiosRequestConfig = {
      headers: { test: 'aaa' },
      auth: { username: 'test', password: 'test' }
    }
    const merge = mergeConfig(defaultConfig, config)
    expect(merge.headers['test']).toBe('aaa')
    expect(merge.auth).toEqual(config.auth)
  })
  test('mergeConfig 接收默认参数 defaults， 第二个参数对象中传入 headers 和 auth 属性为普通对象，返回结果中会做合并', () => {
    const config: AxiosRequestConfig = {
      headers: { test: 'aaa' },
      auth: { username: 'test', password: 'test' }
    }
    const merge = mergeConfig(defaultConfig, config)
    expect(merge.headers['test']).toBe('aaa')
    expect(merge.auth).toEqual(config.auth)
  })
  test('mergeConfig 接收默认参数 defaults， 第二个参数对象中传入 headers 属性为 null，返回结果 headers 为 null', () => {
    const config: AxiosRequestConfig = {
      headers: null
    }
    const merge = mergeConfig(defaultConfig, config)
    expect(merge.headers).toBeNull()
  })
  test('mergeConfig 接收默认参数 defaults， 第二个参数对象中传入 headers 属性为 null，返回结果 headers 为 null', () => {
    const config: AxiosRequestConfig = {
      headers: null
    }
    const merge = mergeConfig(defaultConfig, config)
    expect(merge.headers).toBeNull()
  })
  test('mergeConfig 接收第一个参数对象 headers 属性为 null，第二个参数对象 headers 为 undefined，返回结果 headers 为 null', () => {
    const merge = mergeConfig({ headers: null })
    expect(merge.headers).toBeNull()
  })
})
