// StationMasterCard.js
import React, { useState } from 'react';

const StationMasterCard = () => {
  // Dummy data for station masters
  const dummyStationMasters = [
    {
      id: 1,
      smNumber: '001',
      stationName: 'Maradana',
      stationMasterName: 'Sunil Perera',
    },
    {
      id: 2,
      smNumber: '002',
      stationName: 'Colombo Fort',
      stationMasterName: 'Kamal De Silva',
    },
    {
      id: 3,
      smNumber: '003',
      stationName: 'Gampaha',
      stationMasterName: 'Jayantha Pieris',
    },
    {
      id: 4,
      smNumber: '004',
      stationName: 'Galle',
      stationMasterName: 'Saman De Zoysa',
    },

    {
      id: 5,
      smNumber: '005',
      stationName: 'Matara',
      stationMasterName: 'Nimal Perera',
    },
  ];

  return (
    <div className="station-master-card">
      <div className="card-header">
        <div className="header-item">SM Number</div>
        <div className="header-item">Station Name</div>
        <div className="header-item">Station Master Name</div>
        <div className="header-item">Actions</div>
      </div>
      {dummyStationMasters.map((stationMaster) => (
        <div key={stationMaster.id} className="card-content">
          <div className="content-item">{stationMaster.smNumber}</div>
          <div className="content-item">{stationMaster.stationName}</div>
          <div className="content-item">{stationMaster.stationMasterName}</div>
          <div className="content-item">
            <button className="edit-button">Edit</button>
            <button className="remove-button">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationMasterCard;
