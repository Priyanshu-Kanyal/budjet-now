import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#f5f5fa',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <h1 style={{ color: '#7c5dfa', fontWeight: 700, fontSize: '2rem', margin: 0 }}>
        Spend Sense
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: '#888', fontSize: '1rem' }}>
          Track your expenses with ease
        </span>
        <button
          onClick={handleSignOut}
          style={{
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;