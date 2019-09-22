import { CancelToken } from './CancelToken'
import { Canceler } from './Canceler'

/**
 * CancelTokenSource接口:定义 CancelTokenSource 作为 CancelTokenStatic 类静态方法 source 函数的返回值类型
 * @interface {CancelTokenSource}
 */
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}
