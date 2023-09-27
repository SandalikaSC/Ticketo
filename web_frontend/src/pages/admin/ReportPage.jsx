import React, { useState } from 'react';
import IncomeReportOptions from '../../components/admin/IncomeReportOptions';
import IncomeReportView from '../../components/admin/IncomeReportView';
import PlaceholderImage from '../../assets/reports.png';
import '../../css/admin_complaints.css';
import axios from 'axios'; // Import Axios for making API requests

const ReportPage = () => {
  const [selectedReportData, setSelectedReportData] = useState(null);

  // Create a function to fetch report data from the backend
  const fetchReportData = (reportOptions) => {
    // Make an API request to your backend with the reportOptions
    axios
    .get('http://localhost:5000/api/reports/income', { params: reportOptions })
    .then((response) => {
      setSelectedReportData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching report data:', error);
      setSelectedReportData(null);
    });
  

  };

  // Handle the "View Report" event from the IncomeReportOptions component
  const handleViewReport = (reportData) => {
    fetchReportData(reportData); // Call the function to fetch report data
  };

  return (
    <div className="report-page">
      <div className="report-options-container">
        <IncomeReportOptions onViewReport={handleViewReport} />
      </div>
      <div className="report-view-container">
        {selectedReportData ? (
          <IncomeReportView reportData={selectedReportData} />
        ) : (
          <img src={PlaceholderImage} alt="Placeholder" className="placeholder-image" />
        )}
      </div>
    </div>
  );
};

export default ReportPage;
