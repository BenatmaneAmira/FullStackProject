import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserListPage.css';
import Header from '../../Components/Header/Header';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/users/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include the token
          },
        });

        // If filter is empty, show all users. Otherwise, filter by exact username match.
        const filteredUsers = filter 
          ? response.data.filter(user => user.username === filter)  // Exact match filtering
          : response.data;  // Show all users if no filter applied
          
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, [filter]);  // Refetch users whenever the filter changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/users/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));  // Remove deleted user from the state
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard">
        <input
          type="text"
          placeholder="Filter by username"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}  // Update filter state on input change
          className="filter-bar-two"
        />
        

        {users.length > 0 ? (
          users.map((user) => (
            <div className="dashboard-card" key={user._id}>
              <div>
                <h3>{user.username}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
              <div>
                <button
                  className="dashboard-delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
