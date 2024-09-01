import { Login, Result } from '@/services/types/api';
import request from '@/utils/request';
import hyRequest from '@/services/requests';

export default {
  login(params: Login.LoginParams){
    return request.post<string>('', params)
  },
  login2(params: Login.LoginParams){
    return hyRequest.post<Result<Login.LoginParams>>({
      url: '/user/login',
      data: params
    })
  }
}
