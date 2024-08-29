import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ConfigProvider, App as AntdApp, theme } from 'antd'


import LoginContainer from './components/Login'
import AntdGlobal from '@/utils/AntdGlobal.tsx';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';

import './assets/common.css'

function App() {

  const isDark = false

  return (
    <>
      <ConfigProvider
        theme={{
        token: {
          colorPrimary: '#554c39'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}>
        <AntdApp>
          <AntdGlobal />
          {/* router */}
          {/* <div className="main">{useRoutes(routes)}</div> */}
          <RouterProvider router={router} />
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
