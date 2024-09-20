import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>BOOK SEEKER</h4>
          <p>Your one-stop place to discover great books!</p>
        </div>
        <div className="footer-section links">
          <p><a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/terms">Terms of Service</a></p>
        </div>
        <div className="footer-section social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/facebook.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="/twitter.png" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/instagram.png" alt="Instagram" />
          </a>
        </div>
        <button className="logout-button" onClick={handleLogout} aria-label="Logout">
          Logout
        </button>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Book Seeker - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
