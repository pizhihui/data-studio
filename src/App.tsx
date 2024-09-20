import { useState } from 'react'

import { ConfigProvider, App as AntdApp, theme, Layout } from 'antd'

import LoginContainer from './components/Login'
import AntdGlobal from '@/utils/AntdGlobal'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import router from '@/router'

import './assets/common.css'
import Home from "@/views/Home/index3";

function App() {

  const isDark = false

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#554c39'
          },
          components: {
            Radio: {},
            Menu: {},
            Layout: {headerHeight: '55px'}
          },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}>
        <AntdApp>
          <AntdGlobal/>
          {/* router */}
          {/* <div className="main">{useRoutes(routes)}</div> */}
          <RouterProvider router={router}/>
          {/*<Home />*/}
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
