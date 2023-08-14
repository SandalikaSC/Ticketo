import React, { useState } from 'react';
import '../../css/sm_dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrain } from '@fortawesome/free-solid-svg-icons';

const trainData = [
  { trainName: 'Samudra Devi', number: 'T1234', destination: 'Colombo Fort', currentLocation: 'Hikkaduwa', arrival: '5.00AM', delay: '2' },
  { trainName: 'Galu Kumari', number: 'T4532', destination: 'Maradana', currentLocation: 'Galle', arrival: '7.30AM', delay: '10' },
  { trainName: 'Ruhunu Kumari', number: 'T4832', destination: 'Maradana', currentLocation: 'Galle', arrival: '6.30AM', delay: '10' },
  { trainName: 'Rajarata Rajini', number: 'T4512', destination: 'Anuradapura', currentLocation: 'Matara', arrival: '10.30AM', delay: '10' },
  { trainName: 'Sagarika', number: 'T4772', destination: 'Maradana', currentLocation: 'Hikkaduwa', arrival: '5.30AM', delay: '10' }, 
  { trainName: 'Ella Odyssey', number: 'T4232', destination: 'Badulla', currentLocation: 'Gampaha', arrival: '8.30PM', delay: '10' }, 
  { trainName: 'Podi Manike', number: 'T1232', destination: 'Badulla', currentLocation: 'Haputhale', arrival: '8.30PM', delay: '10' }, 
  { trainName: 'Yal Devi', number: 'T1432', destination: 'Kankasanthurai', currentLocation: 'Mount Lavinia', arrival: '8.30PM', delay: '10' }, 
];

const ViewDelays = () => {
  const [sortOption, setSortOption] = useState('new'); 

  const sortedTrainData = [...trainData].sort((a, b) => {
    if (sortOption === 'older') {
      return a.arrival.localeCompare(b.arrival);
    } else {
      return b.arrival.localeCompare(a.arrival);
    }
  });
  return (
    <div className="train-delays-container">
      <h1>Train Delays</h1>
      <div className="sorting-options">
        <label htmlFor="sort-select">Sort the order you want to see-</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="new">Newest First</option>
          <option value="older">Oldest First</option>
        </select>
      </div>
      <div className="flex-card-container">
        {sortedTrainData.map((train, index) => (
          <div key={index} className="flex-card">
            <div className="card-topic">
              <FontAwesomeIcon icon={faTrain} style={{ marginRight: '10px' }} />
              {train.trainName}
            </div>
            <div className="flex-card-content-center">
              <div className="content-right">
                <p>Train Number: {train.number}</p>
                <p>Destination: {train.destination}</p>
                <p>Current Location: {train.currentLocation}</p>
                <p>Arrival: {train.arrival}</p>
                <p>Delay: {train.delay} minutes</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default ViewDelays;
export default ViewDelays;
