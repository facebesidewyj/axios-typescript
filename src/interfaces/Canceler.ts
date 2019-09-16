/**
 * Canceler接口:定义取消方法
 * @interface {Canceler}
 */
export interface Canceler {
  (message?: string): void
}
