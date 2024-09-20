import React, { useState } from 'react';
import './EditBookModal.css';

const AddBookModal = ({ onClose, onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publicationDate: '',
    summary: '',
    coverImage: '',
  });
  const getAuthToken = () => {
    return localStorage.getItem('token'); // Assurez-vous que le token est stocké sous 'token'
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    try {
      // Assuming you have an API to post a new book
      const response = await fetch('http://localhost:7000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newBook = await response.json();
        onBookAdded(newBook); // Update book list
        onClose(); // Close modal
        window.location.reload(); 
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-one">
      <div className="modal-one-content">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
          />
          <textarea
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={handleChange}
          />
          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
          />
          <button type="submit">Add Book</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
