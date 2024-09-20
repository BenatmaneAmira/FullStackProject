import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import Header from '../../Components/Header/Header';

const ProfilePage = () => {
  const [likedBooks, setLikedBooks] = useState([]);

  useEffect(() => {
    const fetchLikedBooks = async () => {
      const response = await fetch('http://localhost:7000/api/users/liked-books', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setLikedBooks(data);
    };

    fetchLikedBooks();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="profile-page">
     
        <div className="book-list">
          {likedBooks.length === 0 ? (
            <p>You haven't liked any books yet.</p>
          ) : (
            likedBooks.map((book) => (
              <div key={book._id} className="book-item">
                <img src={book.coverImage} alt={book.title} className="book-image" />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
