import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const StationMasterCard = () => {
  const [stationMasters, setStationMasters] = useState([]);

  useEffect(() => {
    fetchStationMasters();
  }, []);

  const fetchStationMasters = async () => {
    try {
      // Make a GET request to your API endpoint to retrieve station masters
      const response = await axios.get('http://localhost:5000/api/station-masters'); // Update the URL
      setStationMasters(response.data); // Assuming the response is an array of station masters
    } catch (error) {
      console.error('Error fetching station masters:', error);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this station master from the system?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'No, keep'
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
            <button className="remove-button" onClick={() => handleDeleteClick(stationMaster.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationMasterCard;
