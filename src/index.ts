import { AxiosRequestConfig } from './interfaces'
import { buildUrl } from './utils/urlUtils'
import { transformData } from './utils/dataUtils'
import { transformHeaders } from './utils/headerUtils'
import { xhr } from './post/xhr'

/**
 * Axios类
 * dev：wyj
 * @class Axios
 */
class Axios {
  constructor() {}

  /**
   * http请求函数
   * @param {AxiosRequestConfig} config 配置对象
   */
  public http(config: AxiosRequestConfig): void {
    this.processConfig(config)
    xhr(config)
  }

  /**
   * 配置对象预处理函数
   * @param {AxiosRequestConfig} config 配置对象
   */
  private processConfig(config: AxiosRequestConfig): void {
    config.url = this.transformUrl(config)
    config.headers = this.transformRequestHeaders(config)
    config.data = this.transformRequestData(config)
  }

  /**
   * url转换器
   * @param {AxiosRequestConfig} config 配置对象
   * @returns {String} 转换后的url
   */
  private transformUrl(config: AxiosRequestConfig): string {
    const { url, params, paramsSerializer } = config
    return buildUrl(url, params, paramsSerializer)
  }

  /**
   * 请求参数data处理器
   * @param {AxiosRequestConfig} config 配置对象
   * @returns {String} 转换后的Json字符串
   */
  private transformRequestData(config: AxiosRequestConfig): any {
    const { data } = config
    return transformData(data)
  }

  /**
   * 请求头header处理器
   * @param {AxiosRequestConfig} config 配置对象
   * @returns {Object} 处理后的header对象
   */
  private transformRequestHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return transformHeaders(headers, data)
  }
}

export default Axios
