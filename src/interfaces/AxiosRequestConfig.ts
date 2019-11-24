import { Method } from './../types/Method'
import { AxiosTransformer } from './AxiosTransformer'
import { CancelToken } from './CancelToken'
import { AxiosAuthorization } from './AxiosAuthorization'

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
  paramsSerializer?: (params: any) => string
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AxiosAuthorization
  validateStatus?: (status: number) => boolean
  // 指定索引签名
  [propName: string]: any
}
