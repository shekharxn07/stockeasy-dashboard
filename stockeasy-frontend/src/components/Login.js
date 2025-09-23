// src/components/Login.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    onLogin();
    navigate('/'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>StockEasy Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" defaultValue="admin" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" defaultValue="password" />
          </div>
          <button type="submit" className="btn btn-primary login-btn">Login</button>
        </form>

        {/* == NAYA CODE START == */}
        <div className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        {/* == NAYA CODE END == */}

      </div>
    </div>
  );
}

export default Login;