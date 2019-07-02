import { AxiosRequestConfig } from './AxiosRequestConfig'
/**
 * AxiosResponse接口
 * @interface {AxiosResponse}
 */
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  requestConfig: AxiosRequestConfig
  request: any
}
