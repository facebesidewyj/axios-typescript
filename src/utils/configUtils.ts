import { AxiosRequestConfig } from '../interfaces'
import { config } from 'shelljs'
import { isUndefined, isPlainObject, deepMerge } from './commonUtils'

/**
 * 默认策略
 * @param {any} val1 任意值
 * @param {any} val2 任意值
 * @returns {any} 任意值
 */
function defaultMerge(val1: any, val2: any) {
  return !isUndefined(val2) ? val2 : val1
}

/**
 * 数据合并策略，只取val2
 * @param {any} val1 任意值
 * @param {any} val2 任意值
 * @returns {any} 任意值
 */
function dataMerge(val1: any, val2: any) {
  if (!isUndefined(val2)) {
    return val2
  }
}

/**
 * 对象合并策略
 * @param {any} val1 任意值
 * @param {any} val2 任意值
 * @returns {Object} 合并后的对象
 */
function objMerge(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  }
  if (!isUndefined(val2)) {
    return val2
  }
  if (isPlainObject(val1)) {
    return deepMerge(val1)
  }
  return val1
}

// 策略映射Map
const strategyMap: any = {
  url: dataMerge,
  params: dataMerge,
  data: dataMerge,
  headers: objMerge,
  auth: objMerge
}

/**
 * 获取合并之后的字段值
 * @param {String} key 字段名
 * @param {AxiosRequestConfig} config1 请求配置对象
 * @param {AxiosRequestConfig} config2 请求配置对象
 * @returns {any} 合并之后的字段值
 */
function getMergeField(key: string, config1: AxiosRequestConfig, config2: AxiosRequestConfig): any {
  const strategyFun = strategyMap[key] || defaultMerge
  return strategyFun(config1[key], config2[key])
}

/**
 * 合并请求对象
 * @param {AxiosRequestConfig} config1 请求配置对象
 * @param {AxiosRequestConfig} config2 请求配置对象
 * @returns {AxiosRequestConfig} 合并请求配置对象
 */
function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const res = Object.create(null)

  Object.keys(config2).forEach(key => {
    res[key] = getMergeField(key, config1, config2!)
  })

  Object.keys(config1).forEach(key => {
    if (!config2![key]) {
      res[key] = getMergeField(key, config1, config2!)
    }
  })

  return res
}

export { mergeConfig }
