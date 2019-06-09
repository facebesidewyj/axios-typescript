import { AxiosRequestConfig } from './interfaces'
import xhr from './post/xhr'

function axios(config: AxiosRequestConfig) {
  xhr(config)
}
export default axios
