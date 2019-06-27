/**
 * 请求类型枚举
 * @type {Method}
 */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * AxiosRequestConfig接口
 * @interface {AxiosRequestConfig}
 */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  paramsSerializer?: Function
}
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
/**
 * AxiosPromise接口
 * @interface {AxiosPromise}
 */
export interface AxiosPromise extends Promise<AxiosResponse> {}
