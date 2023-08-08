// StationMastersPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Filter from '../../components/admin/Filter';
import StationMasterCard from '../../components/admin/StationMasterCard';
import '../../css/admin_SMview.css';

const StationMastersPage = () => {
  return (
    <div className="station-masters-page">
      <h1>Station Masters</h1>
      {/* Add filter component */}
      <Filter />

      {/* Add station master details card */}
      <StationMasterCard />

      {/* Add "Add" button in the top right corner */}
      <Link to="/StationMaster" className="add-button">
        Add Station Master
      </Link>
    </div>
  );
};

export default StationMastersPage;
