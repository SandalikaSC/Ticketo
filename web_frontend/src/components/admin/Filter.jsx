// Filter.js
import React, { useState } from 'react';

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState('All'); // Default selected option
  const [searchQuery, setSearchQuery] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-options">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="All">All</option>
          <option value="Option2">By Station</option>
          {/* Add more filter options here */}
        </select>
        {/* Add other filter UI elements here */}
      </div>
      <button className="filter-button">Filter</button>
    </div>
  );
};

export default Filter;
