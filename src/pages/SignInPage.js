import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Default test users
    const defaultUsers = [
      { email: 'user1@example.com', password: 'password123', username: 'John Doe' },
      { email: 'user2@example.com', password: 'password456', username: 'Jane Smith' }
    ];

    // Combine default and registered users
    const allUsers = [...defaultUsers, ...users];

    // Find user
    const user = allUsers.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      login({ email: user.email, username: user.username });
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="create-blog-page">
      <h2>Sign In</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;