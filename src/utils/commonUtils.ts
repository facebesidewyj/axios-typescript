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
 * 判断是否是Function
 * @param {Object} val 判断对象
 * @returns {Boolean} 是否是Function
 */
function isFunction(val: Function): val is Function {
  return typeof val === 'function'
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

export { isDate, isObject, isUndefined, isNull, isURLSearchParams, isFunction }
