import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import recharts

const MonthlyUsageGraph = () => {
  // Dummy data for the monthly usage graph
  const data = [
    { month: 'Jan', usage: 1800 },
    { month: 'Feb', usage: 2900 },
    { month: 'Mar', usage: 4000 },
    { month: 'Apr', usage: 6200  },
    { month: 'May', usage: 7400 },


    // Add more data points here
  ];

  return (
    <div className="monthly-usage-graph">
      <h3>Monthly Passenger Usage</h3>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Bar dataKey="usage" fill="#3D51A9" />
      </BarChart>
    </div>
  );
};

export default MonthlyUsageGraph;
