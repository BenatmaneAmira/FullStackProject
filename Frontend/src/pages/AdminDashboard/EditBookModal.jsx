import React, { useState } from 'react';
import { updateBook } from '../../api';
import './EditBookModal.css';

const EditBookModal = ({ book, onClose }) => {
  const [updatedBook, setUpdatedBook] = useState({ ...book });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(book._id, updatedBook);
      onClose(); // Close the modal
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="modal-one">
      <div className="modal-one-content">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input name="title" value={updatedBook.title} onChange={handleChange} />
          <label><strong>Author:</strong></label>
          <input name="author" value={updatedBook.author} onChange={handleChange} />
          <label><strong>Category:</strong></label>
          <input name="category" value={updatedBook.category} onChange={handleChange} />
          <label><strong>Summary:</strong></label>
          <textarea name="summary" value={updatedBook.summary} onChange={handleChange} />
          <button type="submit">Save Changes</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;