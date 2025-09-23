// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        navigate('/signin');
      }
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group"><label>Full Name</label><input type="text" name="fullName" onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" onChange={handleChange} required /></div>
          <div className="form-group"><label>Password</label><input type="password" name="password" onChange={handleChange} required /></div>
          <button type="submit" className="btn btn-primary auth-btn">Sign Up</button>
        </form>
        <div className="auth-switch-link"><span>Already have an account? </span><Link to="/signin">Sign In</Link></div>
      </div>
    </div>
  );
}
export default SignUp;