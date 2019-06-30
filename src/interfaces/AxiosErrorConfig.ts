import { AxiosRequestConfig } from './AxiosRequestConfig'
import { AxiosResponse } from './AxiosResponse'
/**
 * AxiosErrorConfig接口:用来定义错误类型
 * @interface {AxiosErrorConfig}
 */
export interface AxiosErrorConfig {
  message: string
  requestConfig: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}
