import { AxiosRequestConfig, AxiosResponse, AxiosErrorConfig } from '../interfaces/'

/**
 * AxiosError类：错误类，用来增强错误信息
 * @class {AxiosError}
 */
export class AxiosError extends Error {
  private requestConfig: AxiosRequestConfig
  private code?: string | null
  private request?: any
  private response?: AxiosResponse | null
  private isAxiosError: boolean = true

  constructor({ message, requestConfig, code, request, response }: AxiosErrorConfig) {
    super(message)

    this.requestConfig = requestConfig
    this.code = code
    this.request = request
    this.response = response

    // 手动设置原型对象
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * 工厂方法：生成错误类
 * @param {AxiosErrorConfig} errorConfig 错误信息配置对象
 * @returns {AxiosError} 错误类对象
 */
export function createError(errorConfig: AxiosErrorConfig): AxiosError {
  return new AxiosError(errorConfig)
}
