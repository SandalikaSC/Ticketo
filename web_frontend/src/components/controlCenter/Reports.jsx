import React from 'react';
import DelayReportCard from './DelayReportCard';

function Reports({ delayReports }) {
  return (
    <div className="reports-container">
      {delayReports.map((report, index) => (
        <DelayReportCard key={index} {...report} />
      ))}
    </div>
  );
}

export default Reports;
