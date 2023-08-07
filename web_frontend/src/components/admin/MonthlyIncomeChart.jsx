import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyIncomeChart = () => {
  // Dummy data for demonstration
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [
      {
        label: 'Monthly Income',
        data: [1000, 1200, 800, 1500, 2000, 1800, 2100, 2500], // Replace with your actual data
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  // Common chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart">
      <h2>Monthly Income from January to August</h2>
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default MonthlyIncomeChart;
