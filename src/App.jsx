import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import './App.css';

function AuthWrapper({ setUsername }) {
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localUsername, password })
      });
      const data = await res.json();
      if (data.success) {
        setUsername(localUsername); // <-- Set App's username state
        navigate('/home');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Could not connect to server');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localUsername, password })
      });
      const data = await res.json();
      if (data.success) {
        alert('Registration successful! You can now log in.');
        setShowRegister(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Could not connect to server');
    }
  };

  return (
    <div className="centered-container">
      {showRegister ? (
        <form className="login-form" onSubmit={handleRegister}>
          <h2 style={{textAlign: 'center', marginBottom: '1rem'}}>Register</h2>
          <input
            placeholder="Username"
            value={localUsername}
            onChange={e => setLocalUsername(e.target.value)}
            autoFocus
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <button type="button" onClick={() => setShowRegister(false)}>Back to Login</button>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2 style={{textAlign: 'center', marginBottom: '1rem'}}>Spend Sense </h2>
          <h2> Login </h2>
          <input
            placeholder="Username"
            value={localUsername}
            onChange={e => setLocalUsername(e.target.value)}
            autoFocus
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setShowRegister(true)}>Register</button>
        </form>
      )}
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthWrapper setUsername={setUsername} />} />
<Route path="/login" element={<AuthWrapper setUsername={setUsername} />} />
<Route path="/register" element={<AuthWrapper setUsername={setUsername} />} />
<Route path="/home" element={<Index username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;