import React from 'react';

const TotalCard = ({ totalIncome }) => {
  return (
    <div className="total-card">
      <h3>Total Income - Galle Railway Station</h3>
      <p className="income-amount">LKR {totalIncome}</p>
    </div>
  );
};

export default TotalCard;
