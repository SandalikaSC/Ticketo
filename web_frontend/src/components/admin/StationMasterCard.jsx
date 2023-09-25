import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const StationMasterCard = () => {
  // Initialize state to hold station master data
  const [stationMasters, setStationMasters] = useState([]);

  useEffect(() => {
    // Fetch station master data from your backend API
    axios.get('http://localhost:5000/api/stationMasterApi') // Replace with your API endpoint
      .then((response) => {
        // Update the stationMasters state with the data from the API
        setStationMasters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching station masters:', error);
      });
  }, []); // The empty array ensures this runs only once when the component mounts

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this station master from the system?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'No, keep '
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Implement actual deletion logic
        console.log(`Removing station master with ID: ${id}`);
      }
    });
  };

  return (
    <div className="station-master-card">
      <div className="card-header">
        <div className="header-item">SM Number</div>
        <div className="header-item">Station Name</div>
        <div className="header-item">Station Master Name</div>
        <div className="header-item">Actions</div>
      </div>
      {stationMasters.map((stationMaster) => (
        <div key={stationMaster.id} className="card-content">
          <div className="content-item">{stationMaster.smNumber}</div>
          <div className="content-item">{stationMaster.stationName}</div>
          <div className="content-item">{stationMaster.stationMasterName}</div>
          <div className="content-item">
            <button className="edit-button">Edit</button>
            <button
              className="remove-button"
              onClick={() => handleDeleteClick(stationMaster.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationMasterCard;
