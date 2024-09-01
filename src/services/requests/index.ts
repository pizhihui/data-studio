import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
// import { Result } from '@/types/api';
import { message } from '@/utils/AntdGlobal';

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    },
    responseSuccessFn: (res) => {
      console.log('response success res......', res)
      const status = res.status
      if(status === 0) {
        message.error(res.statusText)
        return Promise.reject(res)
      }
      return res.data;
    }
  }
})

export default hyRequest
