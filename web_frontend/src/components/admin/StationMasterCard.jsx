// StationMasterCard.js
import React from 'react';
import Swal from 'sweetalert2';


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
    {
      id: 6,
      smNumber: '006',
      stationName: 'Kandy',
      stationMasterName: 'Gihan Perera',
    },
    {
      id: 7,
      smNumber: '007',
      stationName: 'Ahangama',
      stationMasterName: 'Thilak De Silva',
    },
    {
      id: 8,
      smNumber: '008',
      stationName: 'Beliaththa',
      stationMasterName: 'Sagara Perera',
    },
    {
      id: 9,
      smNumber: '009',
      stationName: 'Peradeniya',
      stationMasterName: 'Sarath Peiris',
    },
    {
      id: 10,
      smNumber: '010',
      stationName: 'Polgahawela',
      stationMasterName: 'Manjula Perera',
    },
  ];
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
      {dummyStationMasters.map((stationMaster) => (
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
