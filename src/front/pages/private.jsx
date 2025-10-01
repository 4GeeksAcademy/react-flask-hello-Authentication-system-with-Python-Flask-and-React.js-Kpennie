import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext.jsx';

export const Private = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='spinner'>Loading...</div>
        <p>Checking your membership card...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='private-container'>
      <div className='vip-room'>
        <h1>Welcome to the VIP Room!</h1>
        <div className='member-info'>
          <h3>Member Information</h3>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Status:</strong> Verified Member
          </p>
        </div>

        <div className='protected-content'>
          <h3>Exclusive Content</h3>
          <div className='content-card'>
            <p>Hello {user?.email}! Welcome to the private area!</p>
            <div className='special-features'>
              <h4>VIP Features Available:</h4>
              <ul>
                <li>Access to exclusive games</li>
                <li>Premium learning materials</li>
                <li>Private member chat rooms</li>
                <li>Special member rewards</li>
                <li>Advanced analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='member-status'>
          <p>
            You are successfully authenticated and can access all VIP features!
          </p>
          <p>Session started at: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};
