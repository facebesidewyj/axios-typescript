import { CancelExecutor, CancelTokenSource, Canceler } from '../interfaces'
import { Cancel } from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

/**
 * CancelToken类：请求取消类型
 * @class {CancelToken}
 */
export class CancelToken {
  public promise: Promise<Cancel>
  public reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return false
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      token,
      cancel
    }
  }
  /**
   * 判断cancelToken被使用过，直接抛出异常
   */
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
