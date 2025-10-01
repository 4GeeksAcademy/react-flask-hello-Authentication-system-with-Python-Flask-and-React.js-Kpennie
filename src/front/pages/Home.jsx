import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext.jsx';

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className='home-container'>
      <div className='hero-section'>
        <h1>🏠 Welcome to the Cool Clubhouse!</h1>

        {isAuthenticated ? (
          <div className='welcome-member'>
            <h2>🎉 Hey there, {user?.email}! 👋</h2>
            <p>You're already a member of our awesome clubhouse!</p>
            <div className='member-actions'>
              <Link to='/private' className='cta-button primary'>
                🎪 Enter VIP Room
              </Link>
              <p>Access your exclusive member content and features!</p>
            </div>
          </div>
        ) : (
          <div className='welcome-guest'>
            <h2>🌟 Join Our Amazing Community!</h2>
            <p>
              Get access to exclusive content, special features, and join our
              awesome community!
            </p>

            <div className='cta-buttons'>
              <Link to='/signup' className='cta-button primary'>
                ✨ Get Your Membership Card
              </Link>
              <Link to='/login' className='cta-button secondary'>
                🎟️ Already Have One? Enter Here!
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className='features-section'>
        <h3>🎯 What's Inside Our Clubhouse?</h3>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>🎮</div>
            <h4>Exclusive Games</h4>
            <p>Play members-only games and compete with friends!</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>📚</div>
            <h4>Learning Resources</h4>
            <p>Access premium tutorials and educational content!</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>💬</div>
            <h4>Community Chat</h4>
            <p>Connect with other members in private chat rooms!</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🏆</div>
            <h4>Rewards System</h4>
            <p>Earn points and unlock special achievements!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
