import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './RegisterPage.css'; 
import LoginModal from '../LoginPage/LoginModal'; 
import Header from '../../Components/Header/Header'
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/users/register', formData);
      console.log('User registered:', response.data);
      navigate('/home'); 
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  const openLoginModal = () => {
    setIsLoginOpen(true); 
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div>
      <Header/>
        <div className="register-page">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username" 
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      
      <p className="login-link">
        Already have an account? <span onClick={openLoginModal} className="login-link">Login</span>
      </p>
     
      <LoginModal isOpen={isLoginOpen} onRequestClose={closeLoginModal} />
    </div>
    </div>
  
  );
};

export default RegisterPage;
