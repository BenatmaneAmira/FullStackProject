import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logoImage from '../../assets/open-book.png';
import book1Image from '../../assets/book1.jpeg'; // Example book image 1
import book2Image from '../../assets/book2.jpeg'; // Example book image 2
import book3Image from '../../assets/book3.jpeg'; // Example book image 3
import book4Image from '../../assets/book4.jpeg'; // Example book image 4

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      <Header />
      
      <div className="side left">
        <img src={book1Image} alt="Book 1" />
        <img src={book2Image} alt="Book 2" />
      </div>
      <div className="main-content">
        <h1>Readers wanted.</h1>
        <button className="register-button" onClick={handleRegisterClick}>
          Discover Great Books
        </button>
      </div>
      <div className="side right">
        <img src={book3Image} alt="Book 3" />
        <img src={book4Image} alt="Book 4" />
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const RegisterClick = () => {
    navigate('/register');
  };

  return (
    <header className="header-home">
      <div className="header-home-content">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" className="header-image" />
          <div className="logo">BOOK SEEKER</div>
        </div>
        <div className="sign-in" onClick={RegisterClick}>SIGN IN</div>
      </div>
    </header>
  );
};

export default HomePage;