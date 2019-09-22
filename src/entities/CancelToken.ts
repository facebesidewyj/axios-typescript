import { CancelExecutor, CancelTokenSource, Canceler } from '../interfaces'

interface ResolvePromise {
  (reason?: string): void
}

/**
 * CancelToken类：请求取消类型
 * @class {CancelToken}
 */
export class CancelToken {
  public promise: Promise<string>
  public reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return false
      }
      this.reason = message
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
}
