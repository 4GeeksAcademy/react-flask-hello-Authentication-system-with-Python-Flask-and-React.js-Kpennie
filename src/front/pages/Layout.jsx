import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar.jsx';
import { AuthProvider } from '../authContext.jsx';

export const Layout = () => {
  return (
    <AuthProvider>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
};
