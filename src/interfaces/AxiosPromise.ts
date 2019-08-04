import { AxiosResponse } from './AxiosResponse'
/**
 * AxiosPromise接口:定义返回的定义Promise类型
 * @interface {AxiosPromise}
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
