/**
 * cookie处理工具函数
 * dev：wyj
 */

/**
 * 根据cookie名称获取指定的value
 * @param {String} cookieName 名称
 * @returns {String} value
 */
function readCookie(cookieName: string): string | null {
  const reg = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
  const match = document.cookie.match(reg)
  return match && match[3]
}

export { readCookie }
