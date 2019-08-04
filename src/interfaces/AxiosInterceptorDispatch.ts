import { AxiosInterceptorManager } from './AxiosInterceptorManager'
import { AxiosRequestConfig } from './AxiosRequestConfig'
import { AxiosResponse } from './AxiosResponse'

/**
 * AxiosInterceptorDispatch接口:拦截器调度执行对象，
 * 分为两类：request为请求拦截器，response为响应拦截器
 * @interface {AxiosInterceptorDispatch}
 */
export interface AxiosInterceptorDispatch {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}
