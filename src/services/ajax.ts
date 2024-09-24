import axios, { AxiosResponse } from 'axios'
import { message as AntMessage } from 'antd'
import { getToken } from '../utils/userTokenUtils.ts'

const instance = axios.create({
  // baseURL: 'http://localhost:3001',
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
  res => {
    const resData = (res.data || {}) as ResType
    const { status, message, data, method } = resData
    // error
    console.log('axios responsexxx', resData)
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

export type ResType = {
  status: number
  method: string
  message?: string
  data?: ResDataType
}
export type ResDataType = {
  // 索引签名
  // 普通对象
  [key: string]: any
}
