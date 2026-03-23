import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Real-time clock for the "Live" feel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) setIsLoggedIn(true);
  };

  return (
    <div className="app-shell">
      {/* Background Particles */}
      <div className="bg-particles">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
      </div>

      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <h1 className="nav-logo">EXP<span className="highlight">08</span></h1>
            <span className="divider">|</span>
            <span className="live-clock">{time}</span>
          </div>
          {isLoggedIn && (
            <button className="logout-link" onClick={() => setIsLoggedIn(false)}>
              ABORT SESSION
            </button>
          )}
        </div>
      </nav>

      <main className="main-content">
        {isLoggedIn ? (
          <div className="glass-card welcome-view fade-in">
            <div className="scanline"></div>
            <div className="status-container">
              <span className="pulse-dot"></span>
              <span className="status-text">CORE UPLINK ACTIVE</span>
            </div>
            
            <h1 className="user-greet">Hello, {username}</h1>
            
            <div className="data-grid">
              <div className="data-item">
                <label>ENCRYPTION</label>
                <p>256-BIT AES</p>
              </div>
              <div className="data-item">
                <label>LATENCY</label>
                <p>14ms</p>
              </div>
            </div>

            <div className="system-log">
              <code>&gt; Initializing Experiment 08...</code>
              <code>&gt; Loading User Preferences...</code>
              <code>&gt; System Stable. Welcome.</code>
            </div>
          </div>
        ) : (
          <div className="glass-card login-view scale-up">
             <div className="scanline"></div>
            <form onSubmit={handleLogin}>
              <h2 className="glitch-text">AUTHENTICATE</h2>
              <div className="input-group">
                <input 
                  type="text" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>IDENTITY</label>
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>ACCESS KEY</label>
              </div>
              <button type="submit" className="btn-primary">
                START UPLINK
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;