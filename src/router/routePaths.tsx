import React, { lazy } from 'react'
import LoginContainer from '@/components/Login';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Error403 from '@/pages/403'
import Error404 from '@/pages/404'
import LayoutContainer from '@/components/Layout';
import LayoutContainer2 from '@/components/Layout2/Layout2.tsx';
import AuthLoader from '@/router/AuthLoader.ts';

const Home = lazy(() => import('@/pages/Home'))
const Welcome = lazy(() => import('@/pages/Welcome'))
const DataStudio = lazy(() => import('@/pages/DataStudio'))


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <LoginContainer />
  },
  {
    // id: '/layout',
    path: '/',
    element: <LayoutContainer />,
    loader: AuthLoader,
    children: [
      {
        path: 'welcome',
        element: <Welcome />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'datastudio',
        element: <DataStudio />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default createBrowserRouter(routes)
