import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInterceptorDispatch
} from '../interfaces'
import { http } from '../request/http'
import { Method } from '../types/Method'
import { isString } from '../utils/commonUtils'
import { mergeConfig } from '../utils/configUtils'
import { AxiosInterceptorManager } from './AxiosInterceptorManager'
import { DEFAULTS } from './../config'

export class Axios {
  /**
   * 拦截器调度执行对象，通过request.use或response.use来添加拦截器
   * @type {AxiosInterceptorDispatch}
   */
  public interceptorDispatch: AxiosInterceptorDispatch = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse>()
  }
  /**
   * 默认配置对象
   * @type {AxiosRequestConfig}
   */
  public defaults: AxiosRequestConfig

  constructor(initConfig?: AxiosRequestConfig) {
    this.defaults = initConfig || DEFAULTS
  }

  /**
   * 通用请求方法
   * @param {String} url 请求地址
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public request(url: any, requestConfig?: any): AxiosPromise {
    if (isString(url)) {
      if (!requestConfig) {
        requestConfig = {}
      }
      requestConfig.url = url
    } else {
      requestConfig = url
    }

    requestConfig = mergeConfig(this.defaults, requestConfig)
    requestConfig.method = requestConfig.method.toLowerCase()

    const chain: Array<any> = [
      {
        resolved: http,
        rejected: undefined
      }
    ]

    this.interceptorDispatch.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptorDispatch.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(requestConfig)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()
      promise = promise.then(resolved, rejected)
    }

    return promise as AxiosPromise
  }

  /**
   * 封装get请求
   * @param {String} url 请求地址
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public get(url: string, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'get', requestConfig)
  }

  /**
   * 封装delete请求
   * @param {String} url 请求地址
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public delete(url: string, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'delete', requestConfig)
  }

  /**
   * 封装head请求
   * @param {String} url 请求地址
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public head(url: string, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'head', requestConfig)
  }

  /**
   * 封装options请求
   * @param {String} url 请求地址
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public options(url: string, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'options', requestConfig)
  }

  /**
   * 封装post请求
   * @param {String} url 请求地址
   * @param {Object} data 请求参数对象
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public post(url: string, data?: any, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'post', requestConfig, data)
  }

  /**
   * 封装put请求
   * @param {String} url 请求地址
   * @param {Object} data 请求参数对象
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public put(url: string, data?: any, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'put', requestConfig, data)
  }

  /**
   * 封装patch请求
   * @param {String} url 请求地址
   * @param {Object} data 请求参数对象
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public patch(url: string, data?: any, requestConfig?: AxiosRequestConfig): AxiosPromise {
    return this.httpWithMethod(url, 'patch', requestConfig, data)
  }

  /**
   * 私有方法：封装通用请求方法
   * @param {String} url 请求地址
   * @param {String} method 请求方法
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @param {Object} data 请求参数对象
   * @returns {AxiosPromise} Promise对象
   */
  private httpWithMethod(
    url: string,
    method: Method,
    requestConfig?: AxiosRequestConfig,
    data?: any
  ): AxiosPromise {
    let config = Object.assign(requestConfig || {}, { url, method })
    if (data) {
      config.data = data
    }
    return this.request(config)
  }
}
