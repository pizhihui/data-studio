export const users =  [
  // public key
  {
    url: '/api/rest_j/v1/user/publicKey',
    method: 'get',
    response() {
      return {
        "method": null,
        "status": 0,
        "message": "Gain success(获取成功)！",
        "data": {
          "enableSSL": false,
          "enableLoginEncrypt": false
        }
      }
    }
  },
  // 登录, password,userName
  // {"userName":"hadoop","password":"xxxxxxxxx"}
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
