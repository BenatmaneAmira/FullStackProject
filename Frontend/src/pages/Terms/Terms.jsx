import React from 'react';
import './Terms.css';
import Header from '../../Components/Header/Header';
const Terms = () => {
  return (
    <div><Header/> <div className="terms-page">
      <h1>Terms of Service</h1>
      <p>Welcome to Book Seeker. By accessing and using our platform, you agree to comply with the following terms and conditions. Please read these terms carefully before using our services.</p>
      <h2>Usage</h2>
      <p>Users are responsible for their own actions while using the platform. Any inappropriate content or misuse may result in suspension or account termination.</p>
      <h2>Liability</h2>
      <p>Book Seeker will not be held liable for any loss or damage arising from the use of our platform, including, but not limited to, loss of data or personal information.</p>
      
      <h2>Privacy</h2>
      <p>Your privacy is important to us. Please refer to our Privacy Policy for more details on how we handle your data.</p>
    </div></div>
   
  );
};

export default Terms;
