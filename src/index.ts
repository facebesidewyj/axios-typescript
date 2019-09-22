import { Axios, CancelToken, Cancel } from './entities'
import { extend } from './utils/commonUtils'
import { AxiosStatic, AxiosRequestConfig } from './interfaces'
import { mergeConfig } from './utils/configUtils'
import { DEFAULTS } from './config'
import { isCancel } from './entities/Cancel'

/**
 * 工厂函数
 * @returns {Object} axios混合对象
 */
function createInstance(config?: AxiosRequestConfig): AxiosStatic {
  const axios = new Axios(config)
  const instance = Axios.prototype.request.bind(axios)

  extend(instance, axios)

  return instance as AxiosStatic
}

const axios = createInstance()

axios.create = function(config) {
  return createInstance(mergeConfig(DEFAULTS, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
