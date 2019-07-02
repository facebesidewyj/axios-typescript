/**
 * 通用工具函数
 * dev：wyj
 */
const toString = Object.prototype.toString

/**
 * 判断是否是日期对象
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是日期对象
 */
function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断是否是对象
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是对象
 */
function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 判断是否是普通对象
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是对象
 */
function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * 判断是否是Function
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是Function
 */
function isFunction(val: any): val is Function {
  return typeof val === 'function'
}
/**
 * 判断是否是String
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是String
 */
function isString(val: any): val is string {
  return typeof val === 'string'
}

/**
 * 判断是否是undefined
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是undefined
 */
function isUndefined(val: any): val is undefined {
  return typeof val === 'undefined'
}

/**
 * 判断是否是null
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是null
 */
function isNull(val: any): val is null {
  return val === null
}

/**
 * 判断是否是URLSearchParams
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是URLSearchParams类型
 */
function isURLSearchParams(val: any): val is URLSearchParams {
  return !isUndefined(URLSearchParams) && val instanceof URLSearchParams
}

/**
 * 判断是否是ArrayBufferView对象
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是ArrayBufferView对象
 */
function isArrayBufferView(val: any): val is ArrayBufferView {
  if (!isUndefined(ArrayBuffer) && ArrayBuffer.isView) {
    return ArrayBuffer.isView(val)
  }
  return val && val.buffer && val.buffer instanceof ArrayBuffer
}

/**
 * 构建混合对象
 * @param {Object} to 目标对象
 * @param {Object} from 原始对象
 * @returns {Object} 混合对象
 */
function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export {
  isDate,
  isObject,
  isPlainObject,
  isUndefined,
  isNull,
  isString,
  isURLSearchParams,
  isFunction,
  isArrayBufferView,
  extend
}
