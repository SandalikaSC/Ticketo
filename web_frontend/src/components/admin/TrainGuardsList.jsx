import React from 'react';

const TrainGuardsList = () => {
  // Dummy data for the list of train guards
  const trainGuards = [
    { id: 1, name: 'Alex Johnson' },
    { id: 2, name: 'Emily Brown' },
    { id: 3, name: 'William Lee' },
    // Add more train guards here
  ];

  return (
    <div className="train-guards-list">
      <h3>Train Guards</h3>
      <ul>
        {trainGuards.map((guard) => (
          <li key={guard.id}>{guard.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainGuardsList;
