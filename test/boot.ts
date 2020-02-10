const jasmineCore = require('jasmine-core')

// @ts-ignore
global.getJasmineRequireObj = function() {
  return jasmineCore
}
require('jasmine-ajax')
