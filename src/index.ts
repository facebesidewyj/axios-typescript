import Axios from './entities/Axios'
import { extend } from './utils/commonUtils'
import { AxiosInstance } from './interfaces/AxiosInstance'

/**
 * 工厂函数
 * @returns {Object} axios混合对象
 */
function createInstance(): AxiosInstance {
  const axios = new Axios()
  const instance = Axios.prototype.request.bind(axios)

  extend(instance, axios)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
