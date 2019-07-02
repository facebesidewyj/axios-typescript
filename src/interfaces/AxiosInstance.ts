import { AxiosRequestConfig } from './AxiosRequestConfig'
import { AxiosPromise } from './AxiosPromise'

/**
 * AxiosInstance接口:用来定义Axios实体需要实现的方法
 * @interface {AxiosInstance}
 */
export interface AxiosInstance {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}
