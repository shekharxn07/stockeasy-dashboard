// src/components/SignIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem('token', data.token); // Token ko save karein
      onLogin();
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>StockEasy Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-group"><label>Email</label><input type="email" name="email" onChange={handleChange} required /></div>
          <div className="form-group"><label>Password</label><input type="password" name="password" onChange={handleChange} required /></div>
          <button type="submit" className="btn btn-primary auth-btn">Sign In</button>
        </form>
        <div className="auth-switch-link"><span>Don't have an account? </span><Link to="/signup">Sign Up</Link></div>
        <div className="auth-switch-link" style={{ marginTop: '10px' }}><Link to="/forgot-password">Forgot Password?</Link></div>
      </div>
    </div>
  );
}
export default SignIn;