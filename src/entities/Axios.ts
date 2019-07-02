import { AxiosPromise } from '../interfaces/AxiosPromise'
import { AxiosRequestConfig } from '../interfaces/AxiosRequestConfig'
import { http } from '../request/http'
import { Method } from '../types/Method'
import { isString } from '../utils/commonUtils'

export default class Axios {
  /**
   * 通用请求方法
   * @param {String} url 请求地址
   * @param {AxiosRequestConfig} requestConfig 请求配置对象
   * @returns {AxiosPromise} Promise对象
   */
  public request(url: string, requestConfig?: AxiosRequestConfig): AxiosPromise {
    if (isString(url)) {
      if (!requestConfig) {
        requestConfig = {}
      }
      requestConfig.url = url
    } else {
      requestConfig = url
    }
    return http(requestConfig)
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
    return http(config)
  }
}
