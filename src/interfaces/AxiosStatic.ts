import { AxiosInstance } from './AxiosInstance'
import { CancelTokenStatic } from './CancelTokenStatic'
import { CancelStatic } from './CancelStatic'
import { AxiosRequestConfig } from './AxiosRequestConfig'

/**
 * AxiosStatic接口: 声明Axios单例的扩展静态接口
 * @interface {AxiosStatic}
 */
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
