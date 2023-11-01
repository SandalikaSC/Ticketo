import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const StationMasterCard = () => {
  const [stationMasters, setStationMasters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStationMasters();
  }, []);

  const fetchStationMasters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get-station-masters"
      );

      console.log(response); // Adjust the URL
      setStationMasters(response.data.stationMasters);
    } catch (error) {
      setError(error); // Capture the error for display
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to remove this station master from the system?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "No, keep",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Implement actual deletion logic

        console.log(`Removing station master with ID: ${id}`);
      }
    });
  };

  return (
    <div className="station-master-card">
      {error && (
        <div className="error-message">
          Error fetching station masters: {error.message}
        </div>
      )}
      <div className="card-header">
        <div className="header-item">Station Master Name</div>
        <div className="header-item">Station Name</div>
        <div className="header-item">mobile number</div>
        <div className="header-item">Actions</div>
      </div>
      {Array.isArray(stationMasters) ? (
        stationMasters
          .filter((stationMaster) => !stationMaster.accountStatus) // Filter by accountStatus
          .map((stationMaster) => (
            <div key={stationMaster.id} className="card-content">
              <div className="content-item">
                {stationMaster.firstName} {stationMaster.lastName}
              </div>
              <div className="content-item">{stationMaster.stationName}</div>
              <div className="content-item">{stationMaster.mobileNumber}</div>
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
          ))
      ) : (
        <div className="loading-message">
          No station masters data available.
        </div>
      )}
    </div>
  );
};

export default StationMasterCard;