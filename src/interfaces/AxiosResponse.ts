import { AxiosRequestConfig } from './AxiosRequestConfig'
/**
 * AxiosResponse接口
 * @interface {AxiosResponse}
 */
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  requestConfig: AxiosRequestConfig
  request: any
}
