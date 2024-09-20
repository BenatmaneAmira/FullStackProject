import React, { useState } from 'react';
import './FilterBar.css'; 

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ title: '', author: '', category: '' });

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="filter-bar">
      <input
        type="text"
        name="title"
        placeholder="Search by title"
        value={filters.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Search by author"
        value={filters.author}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Search by category"
        value={filters.category}
        onChange={handleInputChange}
      />
      <button type="submit" className="icon-button-search">
        <img src="/search.png" className="search-icon-two" alt="Search" />
      </button>
    </form>
  );
};

export default FilterBar;
