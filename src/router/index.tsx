import LoginContainer from '@/components/Login';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import LayoutContainer from '@/components/Layout';
import AuthLoader from '@/router/AuthLoader.ts';

import Home from '@/views/Home';
import Welcome from '@/views/Welcome';


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/login',
    element: <LoginContainer />
  },
  {
    id: '/layout',
    element: <LayoutContainer />,
    loader: AuthLoader,
    children: [
      {
        path: '/Welcome',
        element: <Welcome />
      },
      {
        path: '/Home',
        element: <Home />
      },
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
