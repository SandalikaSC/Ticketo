import React from 'react';
import Filter from '../../components/admin/Filter';
import StationMasterCard from '../../components/admin/StationMasterCard';
// import StationMaster from '../admin/StationMaster';
import Form from '../../components/admin/Form';
import '../../css/admin_SMview.css';

const StationMastersPage = () => {
  return (
    <div className="station-masters-page">
      <div className="left-column">
        <h1>Station Masters</h1>
        {/* Add filter component */}
        <Filter />
        {/* Add station master details card */}
        <StationMasterCard />
      </div>
      <div className="right-column">
        {/* Embed the StationMaster component */}
        <Form />
      </div>
    </div>
  );
};

export default StationMastersPage;