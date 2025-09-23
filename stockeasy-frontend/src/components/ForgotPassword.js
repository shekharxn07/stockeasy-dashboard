import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Purana message clear karein

    try {
      const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      setMessage(data.message); // Backend se mila message dikhayein

    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p>Enter your email to receive a reset link.</p>
        
        {!message ? (
          <form onSubmit={handleForgotSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <p className="success-message">{message}</p>
        )}

        <div className="auth-switch-link">
          <Link to="/signin">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;