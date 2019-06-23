import { AxiosRequestConfig } from './interfaces'
import { buildUrl } from './utils/urlUtils'
import { transformData } from './utils/dataUtils'
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
    config.data = this.transformRequest(config)
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
   * data转换器
   * @param {AxiosRequestConfig} config 配置对象
   * @returns {String} 转换后的Json字符串
   */
  private transformRequest(config: AxiosRequestConfig): string {
    const { data } = config
    return transformData(data)
  }
}

export default Axios
