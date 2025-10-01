import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../authContext.jsx';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/private');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await login(email, password);

    if (result.success) {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/private');
      }, 1000);
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h2>🏠 Enter the Clubhouse</h2>
        <p>Show your membership card to get in!</p>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='your-email@example.com'
            />
          </div>

          <div className='form-group'>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your secret password'
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? '🔄 Checking...' : '🎟️ Login'}
          </button>
        </form>

        {message && (
          <div
            className={`message ${
              message.includes('successful') ? 'success' : 'error'
            }`}
          >
            {message}
          </div>
        )}

        <p className='auth-switch'>
          Don't have a membership card?{' '}
          <Link to='/signup'>Get one here! 📝</Link>
        </p>
      </div>
    </div>
  );
};
