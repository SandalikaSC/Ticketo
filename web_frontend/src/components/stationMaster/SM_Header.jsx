import React, { useState } from 'react';
import profileImage from '../../assets/user8.png';

const SM_Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Add your search logic here
    console.log('Search Term:', event.target.value);
  };

  return (
    <div className="header">
      {/* Commented out the search bar */}
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div> */}
      <div className="admin-profile">
        <img src={profileImage} alt="Station master Profile" />
        <span>Station Master </span>
      </div>
    </div>
  );
};

export default SM_Header;
