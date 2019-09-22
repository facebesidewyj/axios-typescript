import { CancelExecutor } from './CancelExecutor'
import { CancelTokenSource } from './CancelTokenSource'
/**
 * CancelTokenStatic接口:定义取消认证类静态接口
 * @interface {CancelTokenStatic}
 */
export interface CancelTokenStatic {
  new (executor: CancelExecutor): void
  source(): CancelTokenSource
}
