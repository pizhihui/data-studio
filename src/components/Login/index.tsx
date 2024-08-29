import { LoginForm } from './LoginForm/Login.tsx'

import './index.css'
import { Login } from '@/types/api';

import storage from '@/utils/storage'
import api from '@/services/api.ts';
import React, { useState } from 'react';
import { message } from '@/utils/AntdGlobal.tsx';
import { sleep } from '@/utils';


const LoginContainer: React.FC = () => {

  const handleSubmitLogin = async (values: Login.LoginParams) => {

    try {
      // const data = await api.login2(values)
      const data = {}
      console.log('clickLogin', data, values)
      storage.set('token', '123')
      message.success('登录成功')

    } catch (error) {
      console.error('login error', error)
      return
    }
  };

  return (
    <div className="login">
      <i className="login-bg"></i>
      <div className="login-main">
        <div className="login-title">欢迎登录互联分析系统</div>
        <LoginForm  onSubmit={handleSubmitLogin} />
      </div>
    </div>
  )
}

export default LoginContainer
