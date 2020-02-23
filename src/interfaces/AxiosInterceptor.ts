/**
 * AxiosInterceptor接口:拦截器执行对象
 * @interface {AxiosInterceptor}
 */
export interface AxiosInterceptor<T> {
  resolved(val: T): T | Promise<T>
  rejected?(error: any): any
}
