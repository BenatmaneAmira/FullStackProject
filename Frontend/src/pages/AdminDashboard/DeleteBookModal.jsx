
import React from 'react';
import { deleteBook } from '../../api';
import './EditBookModal.css';

const DeleteBookModal = ({ book, onClose }) => {
  const handleDelete = async () => {
    try {
      await deleteBook(book._id);
      onClose(); // Close the modal
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="modal-one">
      <div className="modal-one-content">
        <h2>Are you sure you want to delete "{book.title}"?</h2>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteBookModal;
