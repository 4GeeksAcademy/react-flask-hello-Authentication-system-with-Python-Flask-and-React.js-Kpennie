import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/Layout.jsx';
import { Home } from './pages/home.jsx';
import { Login } from './pages/login.jsx';
import { Signup } from './pages/signup.jsx';
import { Private } from './pages/private.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/private',
        element: <Private />,
      },
    ],
  },
]);
