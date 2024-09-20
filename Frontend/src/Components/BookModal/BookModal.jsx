import React from 'react';
import './Modal.css';

const BookModal = ({ book, onClose }) => {
  const handleOverlayClick = (e) => {
    // On ne ferme la modal que si on clique sur le fond gris (classe 'modal')
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.summary}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Publication date:</strong> {book.publicationDate.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default BookModal;
