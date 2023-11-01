import React, { useState } from 'react';
import '../../css/sm_dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrain } from '@fortawesome/free-solid-svg-icons';

const trainData = [
  { trainName: 'Samudra Devi', number: 'T1234', destination: 'Katugoda', currentLocation: 'Colombo', arrival: '5.00AM', delay: '2' },
  { trainName: 'Galu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '7.30AM', delay: '10' },
  { trainName: 'Ruhunu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '6.30AM', delay: '10' },
  { trainName: 'Rajarata Rajini', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '10.30AM', delay: '10' },
  { trainName: 'Sagarika', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '5.30AM', delay: '10' }, 
  { trainName: 'Night Mail', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30PM', delay: '10' }, 

];

const TrainDelays = () => {
  const [sortOption, setSortOption] = useState('new'); // Default sorting option

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
        <label htmlFor="sort-select"> Select the order you want to see:</label>
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

export default TrainDelays;