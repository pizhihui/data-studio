import axios, { AxiosResponse } from 'axios'
import { message as AntMessage } from 'antd'
import { getToken } from '../utils/userTokenUtils.ts'

const instance = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: '/api/rest_j/v1',
  timeout: 10 * 1000
})

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bear ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  (res: AxiosResponse<ResType>) => {
    // http 本身请求的 code 判断
    if(res.status !== 200) {
      AntMessage.error(res.statusText)
    }

    const resData = res.data || {}
    const { status, message, data, method } = resData
    // 业务接口返回的 code 判断
    if (status !== 0) {
      if (message) {
        AntMessage.error(message)
      }
      throw new Error(message)
    }
    return data as any
  },
  error => Promise.reject(error)
)

export default instance

export type ResType<T = any> = {
  status: number
  method: string
  message?: string
  data?: T
}
export type ResDataType = {
  // 索引签名
  // 普通对象
  [key: string]: any
}
