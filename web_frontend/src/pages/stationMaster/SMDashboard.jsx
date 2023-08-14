import React, { useState } from 'react';
import IncomeReportView from '../../components/admin/IncomeReportView';
import '../../css/sm_dashboard.css';
import SMdashboardCard from '../../components/stationMaster/SMdashboardCard';
import TotalCard from '../../components/stationMaster/TotalCard';

const SMDashboard = () => {
  const [selectedReportData, setSelectedReportData] = useState(null);
  const dummyIncomeAmount = 5000000; // Dummy income amount

  const handleViewReport = (reportData) => {
    setSelectedReportData(reportData);
  };

  return (
    <div className="sm-dashboard"><div className="sm-dashboard-heading"><h1>Dashboard</h1></div>
      <div className="ss-top-cards-container">
        <div className="ss-card">   
          <h2>Total Employees</h2>
          <p>Engineering Personnel=5</p>
          <p>Ticket Checker= 4</p>
          <p>Platform Staff= 5</p>
          <p>Ticket Clerks= 5</p>
          
        </div>
        <div className="ss-card">
           <h2>Today Total Tickets</h2>
           <p>Normal Passenger Tickets:</p>
           <p>2nd Class=400</p>
           <p>3rd Class=520</p>
           <p>Reservations=20</p>
          
   
          </div>
        <div className="ss-card">
          <h2>Upcoming trains: Colombo Direction</h2>
          <p>Galukumari - 07:20 am</p>
          <p>Sagarika - 07:40 am</p></div>
          
        <div className="ss-card"> 
        <h2>Upcoming trains: Matara Direction</h2>
          <p>Express Train Beliaththa - 07:41 am</p>
          <p>Express Train Beliaththa - 08:58 am</p>
          </div>
      </div>
      <div className="ss-right-column">
        
        {selectedReportData ? (
          <IncomeReportView reportData={selectedReportData} />
        ) : (
          <div className="sm-monthly-amount">
            <SMdashboardCard  className="sm-amount-graph"/ >
            <TotalCard totalIncome={dummyIncomeAmount} className="sm-total-income"/>
          </div>
        )}
      </div>
      </div>
    
  );
};

export default SMDashboard;
