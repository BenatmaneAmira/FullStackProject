import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure the path is correct
import logoImage from '../../assets/open-book.png';
import LoginModal from '../../pages/LoginPage/LoginModal'; // Ensure the path is correct for LoginModal

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/users/current-user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('You must be logged in to access this page.'); // Handle 401 error
          } else {
            throw new Error('Something went wrong.'); // Other errors
          }
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrorMessage(error.message);
      }
    };

    fetchUser(); 
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="header-image" />
          <div className="logo">BOOK SEEKER</div>
        </div>
        
        <div className="nav-links">
          <Link to="/home" className={`home-link ${!user ? 'disabled-link' : ''}`}>
            <img src='/home.png' alt="Home Icon" className="home-icon" />
            Home
          </Link>
  
          {!user ? (
            <button className="login-button" onClick={openLoginModal}>
              <img src='/person.png' alt="Login" className="login-icon" />
              Login
            </button>
          ) : (
            <>
              <Link to="/profile" className="profile-link">
                <img src='/book.png' alt="Liked Books" className="book-icon" />
                My Liked books
              </Link>

              {user && user.role === 'admin' && (
                <Link to="/dashboard" className="dashboard-link">
                  <img src='/dashboard.png' alt="Dashboard" className="book-icon" />
                  Dashboard
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </header>
  );
};

export default Header;
