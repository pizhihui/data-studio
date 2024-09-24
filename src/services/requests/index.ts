import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
// import { Result } from '@/types/api';
import { message } from 'antd';
import { HYReqConfig } from '@/services/requests/request/type.ts'

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

interface LinkisData<D> {
  statusCode: number;
  data: D;
  message: string;
}

interface LinkisReqConfig<T, R> extends HYReqConfig<LinkisData<R>> {
  data?: T
}

export const linkisRequest = <T=any, R=any>(config: LinkisReqConfig<T, R>) => {
  return hyRequest.request<LinkisData<R>>(config)
    .then(res => {
      if (!res.statusCode) {
        return Promise.reject(res.data);
      } else {
        return Promise.resolve(res.data)
      }
    })
}

export default hyRequest
