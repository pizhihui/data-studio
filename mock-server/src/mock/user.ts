export const users =  [
  // 登录, password,userName
  {
    url: '/api/rest_j/v1/user/login',
    method: 'post',
    response() {
      return {
        status: 0,
        message: 'login successful(登录成功)！',
        data: {
          isAdmin: true,
          sessionTimeOut: 3600000,
          userName: 'hadoop',
          enableWatermark: true
        }
      }
    }
  }
]
