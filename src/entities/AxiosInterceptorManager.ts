import { AxiosInterceptor } from './../interfaces/'
import { isFunction } from '../utils/commonUtils'

/**
 * AxiosInterceptorManager类：拦截器管理类，支持范型
 * @class {AxiosInterceptorManager}
 */
export class AxiosInterceptorManager<T> {
  /**
   * 拦截器缓存列表
   * @type {Array<AxiosInterceptor<T> | null>}
   */
  private interceptors: Array<AxiosInterceptor<T> | null> = []

  /**
   * 添加拦截器
   * @param {AxiosInterceptor} interceptor 拦截器执行对象
   * @returns {Number} 拦截器索引
   */
  use(interceptor: AxiosInterceptor<T>) {
    this.interceptors.push(interceptor)
    return this.interceptors.length - 1
  }

  /**
   * 遍历拦截器缓存列表，执行对应的回调函数
   * @param {Function} callback 回调函数
   */
  forEach(callback: (interceptor: AxiosInterceptor<T>) => void): void {
    for (const interceptor of this.interceptors) {
      if (interceptor && isFunction(callback)) {
        callback(interceptor)
      }
    }
  }

  /**
   * 根据索引删除拦截器
   * @param {Number} id 索引
   */
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
