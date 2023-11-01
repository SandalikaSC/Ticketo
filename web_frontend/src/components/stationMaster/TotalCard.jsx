import React from 'react';

const TotalCard = ({ totalIncome }) => {
  return (
    <div className="total-card">
      <h3>Next Train Arrivals  - Galle Railway Station</h3>
      {/*<p className="income-amount">LKR {totalIncome}</p>*/}
      <div className="sm-schedule-card">   
          
         <div className='sm-schedule-table'><p>Train Name </p></div>
         <div className='sm-schedule-table'><p>Arrival Time </p></div>
         <div className='sm-schedule-table'><p>Departure Time </p></div>
         
          
          
        </div>
        <div className="sm-schedule-card-details">
        <div className="sm-schedule-table-info">
          <p>Samudra Devi </p>
        </div>
        <div className="sm-schedule-table-info">
          <p>07:20 am</p>
        </div>
        <div className="sm-schedule-table-info">
          <p>07:22 am</p>
        </div>


      </div>
      <div className="sm-schedule-card-details">
        <div className="sm-schedule-table-info">
          <p>Sagarika Train</p>
        </div>
        <div className="sm-schedule-table-info">
          <p>07:40 am</p>
        </div>
        <div className="sm-schedule-table-info">
          <p>07:42 am</p>
        </div>
      </div>


      <div className="sm-schedule-card-details">
        <div className="sm-schedule-table-info">
          <p>Rajarata Rajini</p>
        </div>
        <div className="sm-schedule-table-info">
          <p>07:41 am</p>
        </div>
        <div className="sm-schedule-table-info">
          <p>07:43 am</p>
        </div>
      </div>



    </div>
  );
};

export default TotalCard;
