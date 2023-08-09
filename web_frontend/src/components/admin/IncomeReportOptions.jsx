import React, { useState } from 'react';

const IncomeReportOptions = ({ onViewReport }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleViewClick = () => {
    const reportData = {
      selectedOption,
      startDate,
      endDate,
      selectedMonth,
      selectedYear
    };
    onViewReport(reportData);
  };

  return (
    <div className="report-options">
      <h2>Income Report Options</h2>
      
      <div>
        <h3>Filter by Date Range</h3>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleViewClick}>View</button>
      </div>
      
      <div>
        <h3>Filter by Month</h3>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select a month</option>
          <option value="">Jan</option>
          <option value="">Feb</option>
          <option value="">Mar</option>
          <option value="">Apr</option>
          <option value="">May</option>
          <option value="">June</option>
          <option value="">July</option>
          <option value="">Aug</option>
          <option value="">Sep</option>
          <option value="">Oct</option>
          <option value="">Nov</option>
          <option value="">Dec</option>
        </select>
        <button onClick={handleViewClick}>View</button>
      </div>
      
      <div>
        <h3>Filter by Year</h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select a year</option>
          <option value="">2023</option>
          <option value="">2022</option>
          <option value="">2021</option>
          <option value="">2020</option>

        </select>
        <button onClick={handleViewClick}>View</button>
      </div>
    </div>
  );
};

export default IncomeReportOptions;
