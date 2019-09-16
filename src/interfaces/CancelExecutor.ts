import { Canceler } from './Canceler'

/**
 * CancelExecutor接口:定义CancelToken类的构造函数参数
 * @interface {CancelExecutor}
 */
export interface CancelExecutor {
  (cancel: Canceler): void
}
