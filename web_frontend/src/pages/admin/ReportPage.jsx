import React, { useState } from 'react';
import IncomeReportOptions from '../../components/admin/IncomeReportOptions';
import IncomeReportView from '../../components/admin/IncomeReportView';
import '../../css/admin_complaints.css';

const ReportPage = () => {
  const [selectedReportData, setSelectedReportData] = useState(null);

  const handleViewReport = (reportData) => {
    setSelectedReportData(reportData);
  };

  return (
    <div className="report-page">
      <div className="report-options-container">
        <IncomeReportOptions onViewReport={handleViewReport} />
      </div>
      <div className="report-view-container">
        {selectedReportData && <IncomeReportView reportData={selectedReportData} />}
      </div>
    </div>
  );
};

export default ReportPage;
