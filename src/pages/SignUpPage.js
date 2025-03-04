import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Create user object
    const newUser = {
      username: formData.username,
      email: formData.email
    };

    // Store user in localStorage (simulate backend)
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === formData.email);
    if (existingUser) {
      setError('User with this email already exists');
      return;
    }

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // Login the user
    login(newUser);
    navigate('/');
  };

  return (
    <div className="create-blog-page">
      <h2>Sign Up</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;