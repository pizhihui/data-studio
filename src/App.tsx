import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { ConfigProvider, App as AntdApp, theme } from 'antd'


import LoginContainer from './components/Login'
import { RouterProvider, useRoutes } from 'react-router-dom';
import router from '@/router/';

import './assets/common.css'

import './assets/styles/global.less'


function App() {

  const isDark = false

  return (
    <>
      {/* antd theme  */}
      <ConfigProvider
        theme={{
          token: {
            motion: false,
            // colorBgContainer: '#f6ffed',
            "fontSize": 14,
            "borderRadius": 2,
            "wireframe": false,
            "colorPrimary": "#1969c3",   // #1DA57A  #13c2c2  #71c462 #1969c3
            "colorInfo": "#13c2c2",
            "colorSuccess": "#a0d911",
            "colorWarning": "#eb2f96",
            "colorError": "#c12b1a",       // #c12b1a #fa541c
            "sizeUnit": 4,
            "sizeStep": 4,
          },
          components: {
            Radio: {},
            Menu: {},
            Layout: {
              headerHeight: '55px'
            },
            Tabs: {
              cardGutter: '0',
              cardPaddingSM: '4px 8px',
              titleFontSizeSM: '13px',
              horizontalItemPaddingSM: '4px 0',
              horizontalMargin: '0'
            }
          },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}>
        <AntdApp>
          {/* router */}
          {/* <div className="main">{useRoutes(router)}</div> */}
          <Suspense fallback="">
            <RouterProvider router={router}/>
          </Suspense>
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

export default App
