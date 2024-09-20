import React, { useState } from 'react';
import axios from 'axios';
import thumbIcon from '../../assets/like.png'; // Adjust the path accordingly
import './LikeButton.css'
const LikeButton = ({ bookId }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token JWT stocké
      if (!token) {
        throw new Error('User not authenticated');
      }
  
      console.log('Token:', token); // Log the token for debugging
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.post(`http://localhost:7000/api/books/${bookId}/like`, {}, config);
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking/unliking book', error);
    }
  };

  return (
    <button onClick={handleLikeToggle} style={{ background: 'none', border: 'none' }}>
      <img
        src={thumbIcon}
        alt={liked ? 'Unlike' : 'Like'}
        style={{
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          filter: liked ? 'invert(29%) sepia(93%) saturate(5096%) hue-rotate(182deg) brightness(92%) contrast(96%)' : 'none',
        }}
      />
    </button>
  );
};

export default LikeButton;