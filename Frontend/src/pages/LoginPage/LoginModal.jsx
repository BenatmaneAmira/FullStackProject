import React, { useState } from 'react';
import './LoginModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LoginModal = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // Nouvel état pour les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialiser le message d'erreur avant chaque soumission
    try {
      const response = await axios.post('http://localhost:7000/api/users/login', loginData);
      console.log('User logged in:', response.data);
      localStorage.setItem('token', response.data.token); 

      onRequestClose(); 
      navigate('/home'); 
    } catch (error) {
      // Si une erreur se produit, afficher un message d'erreur
      setErrorMessage(error.response?.data?.message || 'Invalid username or password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onRequestClose}>&times;</span>
        <h2>Please Log In</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Message d'erreur */}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
