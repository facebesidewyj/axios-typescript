import { Axios } from './Axios'
import { AxiosRequestConfig } from './AxiosRequestConfig'
import { AxiosPromise } from './AxiosPromise'

/**
 * AxiosInstance接口:标识Axios混合类型
 * @interface {AxiosInstance}
 */
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
