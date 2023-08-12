// SMDashboard.js
import React, { useState } from 'react';
import IncomeReportOptions from '../../components/admin/IncomeReportOptions';
import IncomeReportView from '../../components/admin/IncomeReportView';
import '../../css/sm_dashboard.css';
import SMdashboardCard from '../../components/stationMaster/SMdashboardCard';
import TotalCard from '../../components/stationMaster/TotalCard';
import SM_Header from '../../components/stationMaster/SM_Header';

const SMDashboard = () => {
  const [selectedReportData, setSelectedReportData] = useState(null);
  const dummyIncomeAmount = 5000000; // Dummy income amount

  const handleViewReport = (reportData) => {
    setSelectedReportData(reportData);
  };

  return (
    <div className="sm-dashboard">
      <SM_Header/>
      <div className="dashboard-container">
        <div className="left-column">
          <IncomeReportOptions onViewReport={handleViewReport} />
        </div>
        <div className="right-column">
          {selectedReportData ? (
            <IncomeReportView reportData={selectedReportData} />
          ) : (
            <div>
              <SMdashboardCard />
              <TotalCard totalIncome={dummyIncomeAmount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SMDashboard;
