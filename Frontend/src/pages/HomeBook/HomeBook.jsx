import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../../Components/BookList/BookList';
import FilterBar from '../../Components/FilterBar/FilterBar';
import Header from '../../Components/Header/Header';
import './HomeBook.css'; // Ajoute le fichier CSS pour ce composant

import { useNavigate } from 'react-router-dom';
const HomeBook = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    category: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/books', { params: filters });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };
    fetchBooks();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token de l'utilisateur
    navigate('/'); // Rediriger vers la page de connexion après déconnexion
  };

  return (
    
    <div className="container">
      <Header />
      <FilterBar onFilterChange={handleFilterChange} />
     <BookList books={books} />
     <div>
      
      </div>
    </div>
  );
};

export default HomeBook;
