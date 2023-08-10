import React from 'react';
import { Pie } from 'react-chartjs-2';

const TicketTypePieChart = () => {
  const data = {
    labels: ['Normal', 'Reservation', 'Work Season', 'School Season'],
    datasets: [
      {
        data: [300, 150, 200, 100], // Dummy data for ticket type sales
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'], // Colors for each slice
      },
    ],
  };

  return (
    <div>
      <h2>Ticket Type Sales Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default TicketTypePieChart;
