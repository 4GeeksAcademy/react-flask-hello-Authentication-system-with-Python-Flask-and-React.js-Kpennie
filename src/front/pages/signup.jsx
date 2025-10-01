import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../authContext.jsx';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/private');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    const result = await signup(email, password);

    if (result.success) {
      setMessage('Account created successfully! Please login now.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h2>🎫 Get Your Membership Card</h2>
        <p>Join our exclusive clubhouse!</p>

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
              placeholder='Create a secret password (min 6 chars)'
            />
          </div>

          <div className='form-group'>
            <label>Confirm Password:</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder='Type your password again'
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? '🔄 Creating...' : '✨ Create Account'}
          </button>
        </form>

        {message && (
          <div
            className={`message ${
              message.includes('successfully') ? 'success' : 'error'
            }`}
          >
            {message}
          </div>
        )}

        <p className='auth-switch'>
          Already have a membership card?{' '}
          <Link to='/login'>Use it here! 🎟️</Link>
        </p>
      </div>
    </div>
  );
};
