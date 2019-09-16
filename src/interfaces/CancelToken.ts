/**
 * CancelToken接口:定义取消认证类
 * @interface {CancelToken}
 */
export interface CancelToken {
  promise: Promise<String>
  reason?: string
}
