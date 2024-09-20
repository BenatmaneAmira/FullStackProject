import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api'; // Assurez-vous que cette fonction accepte des paramètres de filtre
import EditBookModal from './EditBookModal';
import DeleteBookModal from './DeleteBookModal';
import AddBookModal from './AddBookModal';
import Header from '../../Components/Header/Header';
import FilterBar from '../../Components/FilterBar/FilterBar'; // Utiliser FilterBar pour capturer les filtres
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); 
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    category: '',
  });
  const navigate = useNavigate();
useEffect(() => {
  const fetchBooks = async () => {
    try {
      const result = await getBooks(filters); // Pass filters
      setBooks(result);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };
  fetchBooks();
}, [filters]); 

  const openEditModal = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); 
  };

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };
  const handleUserManagement = () => {
    navigate('/userlist'); 
  };
  return (
    <div>
      <Header />
      <div className="admin-dashboard">
        <div className="filter-bar-container">
          <FilterBar onFilterChange={handleFilterChange} /> {/* Composant de filtrage */}
          <button className="add-book-button" onClick={() => setShowAddModal(true)}>
            Add New Book
          </button>
          <button className="user-management-button" onClick={handleUserManagement}>
          User Management
          </button>
        </div>

        <div className="book-list-dash">
          {books.map((book) => (
            <div key={book._id} className="book-item-dash">
              <div>
                <img src={book.coverImage} alt={book.title} className="book-image-dash" />
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description:</strong> {book.summary}</p>
              </div>
              <div className='button-edit-delete'>
                <button className="edit-button" onClick={() => openEditModal(book)}>Edit</button>
              </div>
              <div className='button-edit-delete'>
                <button className="delete-button" onClick={() => openDeleteModal(book)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <AddBookModal
            onClose={() => setShowAddModal(false)}
            onBookAdded={handleBookAdded}
          />
        )}

        {showEditModal && (
          <EditBookModal
            book={selectedBook}
            onClose={() => setShowEditModal(false)}
          />
        )}

        {showDeleteModal && (
          <DeleteBookModal
            book={selectedBook}
            onClose={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
