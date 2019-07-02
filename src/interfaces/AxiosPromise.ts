import { AxiosResponse } from './AxiosResponse'
/**
 * AxiosPromise接口
 * @interface {AxiosPromise}
 */
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
