import React from 'react';
import BookItem from '../BookItem/BookItem';
import { useNavigate } from 'react-router-dom';


const BookList = ({ books }) => {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem('token'); // Supprimer le token de l'utilisateur
  navigate('/'); 
}
  return (
    <div>
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
        </div>
     
    </div>
  );
  
};

export default BookList;
