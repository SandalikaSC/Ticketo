import React, { useState } from 'react';
import IncomeReportOptions from '../../components/admin/IncomeReportOptions';
import IncomeReportView from '../../components/admin/IncomeReportView';
import '../../css/sm_dashboard.css';
import SMdashboardCard from '../../components/stationMaster/SMdashboardCard';

const SMDashboard = () => {
  const [selectedReportData, setSelectedReportData] = useState(null);

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
          <SMdashboardCard />
        )}
      </div>
    </div>
  );
};

export default SMDashboard;