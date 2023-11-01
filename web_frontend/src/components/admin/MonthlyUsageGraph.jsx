import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import recharts

const MonthlyUsageGraph = () => {
  // Dummy data for the monthly usage graph
  const data = [
    { month: 'Normal', usage: 78000 },
    { month: 'Reser', usage: 49000 },
    // { month: 'School', usage: 140000 },
    { month: 'Gov', usage: 8800  },
    { month: 'Private', usage: 7400 },


    // Add more data points here
  ];

  return (
    <div className="monthly-usage-graph">
      <h3>Income from ticket types</h3>
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
