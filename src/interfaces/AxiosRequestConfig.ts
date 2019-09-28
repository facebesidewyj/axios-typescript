import { Method } from './../types/Method'
import { AxiosTransformer } from './AxiosTransformer'
import { CancelToken } from './CancelToken'

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
  cancelToken?: CancelToken
  withCredentials?: boolean
  // 指定索引签名
  [propName: string]: any
}
