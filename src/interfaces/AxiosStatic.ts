import { AxiosErrorConfig } from './AxiosErrorConfig'
import { AxiosInstance } from './AxiosInstance'

/**
 * AxiosStatic接口: 声明Axios单例的扩展静态接口
 * @interface {AxiosStatic}
 */
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosErrorConfig): AxiosInstance
}
