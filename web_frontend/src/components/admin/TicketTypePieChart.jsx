import React from 'react';
import { Pie } from 'react-chartjs-2';

const TicketTypePieChart = () => {
  // Dummy data for demonstration
  const data = {
    labels: ['Normal Tickets', 'Reservation Tickets', 'Work Season', 'School Season'],
    datasets: [
      {
        label: 'Ticket Types',
        data: [30, 20, 15, 35], // Replace with your actual data
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  // Common chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="chart">
      <h2>Ticket Types Income</h2>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};

export default TicketTypePieChart;
