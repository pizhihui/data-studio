import { Login, Result } from '@/services/types/api';
import request from '@/utils/request.ts';
import priRequest from '@/services/requests';

export default {
  login(params: Login.LoginParams){
    return request.post<string>('', params)
  },
  // login2(params: Login.LoginParams){
  //   return priRequest.post<Result<Login.LoginParams>>({
  //     url: '/user/login',
  //     data: params
  //   })
  // }
}
