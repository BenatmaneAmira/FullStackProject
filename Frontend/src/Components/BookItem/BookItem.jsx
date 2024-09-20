import React, { useState } from 'react';
import BookModal from '../BookModal/BookModal';
import LikeButton from '../LikeButton/LikeButton';

import './BookItem.css'; // Import CSS for BookItem
const BookItem = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  
  return (
    <div className="book-item">
      <img src={book.coverImage} alt={book.title} className="book-image" />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button className="view-details-button" onClick={handleModalOpen}>
        View Details
      </button>
      <LikeButton bookId={book._id} />
      {isModalOpen && <BookModal book={book} onClose={handleModalClose} />}
     
    </div>
  );
};

export default BookItem;
