import React from 'react';

const StationMastersList = () => {
  // Dummy data for the list of station masters
  const stationMasters = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    // Add more station masters here
  ];

  return (
    <div className="station-masters-list">
      <h3>Station Masters</h3>
      <ul>
        {stationMasters.map((master) => (
          <li key={master.id}>{master.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StationMastersList;
