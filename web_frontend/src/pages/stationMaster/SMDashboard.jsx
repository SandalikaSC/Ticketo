import React, { useState } from 'react';
import IncomeReportOptions from '../../components/admin/IncomeReportOptions';
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
    <div className="sm-dashboard">
      <div className="ss-left-column">
        <IncomeReportOptions onViewReport={handleViewReport} />
      </div>
      <div className="ss-right-column">
        {selectedReportData ? (
          <IncomeReportView reportData={selectedReportData} />
        ) : (
          <div>
            <SMdashboardCard />
            <TotalCard totalIncome={dummyIncomeAmount} /> {/* Pass the dummy income amount */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SMDashboard;