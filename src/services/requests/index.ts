import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
// import { Result } from '@/types/api';
import { message } from '@/utils/AntdGlobal.tsx';

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    },
    responseSuccessFn: (res) => {
      console.log('response success res......', res)
      const status = res.status
      if(status !== 0) {
        message.error('result: ' + res.message)
        return Promise.reject(res.data)
      }
      return res.data;
    }
  }
})

export default hyRequest
