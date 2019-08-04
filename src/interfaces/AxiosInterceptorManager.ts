import { AxiosInterceptor } from './AxiosInterceptor'

/**
 * AxiosInterceptorManager接口:拦截器管理类
 * @interface {AxiosInterceptorManager}
 */
export interface AxiosInterceptorManager<T> {
  use(interceptor: AxiosInterceptor<T>): number
  forEach(callback: (interceptor: AxiosInterceptor<T>) => void): void
  eject(id: number): void
}
