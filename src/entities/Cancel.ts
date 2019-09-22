/**
 * Cancel类：请求取消对象
 * @class {Cancel}
 */
export class Cancel {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

/**
 * 判断是否是Cancel对象
 * @param {Object} value 判断对象
 * @returns {Boolean} 是否是Cancel对象
 */
export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
