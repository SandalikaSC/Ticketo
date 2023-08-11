import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import recharts

const SMdashboardCard = () => {
  // Dummy data for the monthly amount graph
  const data = [
    { month: 'Jan', amount: 35000 },
    { month: 'Feb', amount: 49000 },
    { month: 'Mar', amount: 140000 },
    { month: 'Apr', amount: 182000  },
    { month: 'May', amount: 194000 },
    { month: 'Jun', amount: 200000 },
    { month: 'Jul', amount: 274000 },

    // Add more data points here
  ];

  return (
    <div className="monthly-amount-graph">
      <h3>Monthly Income Chart</h3>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#3D51A9" />
      </BarChart>
    </div>
  );
};

export default SMdashboardCard;
