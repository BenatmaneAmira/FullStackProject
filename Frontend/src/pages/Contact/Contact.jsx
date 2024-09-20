import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import Header from '../../Components/Header/Header';
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_9ypyiob', 'template_w4pf6ql', e.target, 'EIm4dj02evAR_9e1e')
      .then((result) => {
        console.log(result.text);
        setStatus('Message sent successfully');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      }, (error) => {
        console.log(error.text);
        setStatus('Failed to send message');
      });
  };

  return (
    <div>
        <Header/>
        <div className="contact-page">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div></div>
    
  );
};

export default Contact;
