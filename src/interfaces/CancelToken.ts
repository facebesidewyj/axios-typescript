import { Cancel } from './Cancel'

/**
 * CancelToken接口:定义取消认证类
 * @interface {CancelToken}
 */
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
