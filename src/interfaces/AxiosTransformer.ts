import { Method } from '../types/Method'

/**
 * AxiosTransformer接口:定义转换函数
 * @interface {AxiosTransformer}
 */
export interface AxiosTransformer {
  (data: any, headers?: any, method?: any): any
}
