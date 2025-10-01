import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext.jsx';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <Link to='/' className='nav-brand'>
          🏠 Cool Clubhouse
        </Link>

        <div className='nav-links'>
          <Link to='/' className='nav-link'>
            🏡 Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to='/private' className='nav-link'>
                🎪 VIP Room
              </Link>
              <span className='nav-user'>👤 {user?.email}</span>
              <button onClick={handleLogout} className='nav-button logout-btn'>
                🚪 Leave Clubhouse
              </button>
            </>
          ) : (
            <>
              <Link to='/signup' className='nav-link'>
                📝 Get Membership
              </Link>
              <Link to='/login' className='nav-button login-btn'>
                🎟️ Enter Clubhouse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
