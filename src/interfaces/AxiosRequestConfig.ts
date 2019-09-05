import { Method } from './../types/Method'
import { AxiosTransformer } from './AxiosTransformer'

/**
 * AxiosRequestConfig接口:定义接口请求对象
 * @interface {AxiosRequestConfig}
 */
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  responseType?: XMLHttpRequestResponseType
  paramsSerializer?: Function
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  // 指定索引签名
  [propName: string]: any
}
