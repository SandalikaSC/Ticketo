import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import rechartsn
const RevenueChart = () => {
  // Dummy data for the revenue growth chart
  const data = [
    { month: 'Jan', revenue: 50000 },
    { month: 'Feb', revenue: 75000 },
    { month: 'Mar', revenue: 100000 },
    { month: 'Apr', revenue: 150000 },
    { month: 'May', revenue: 240000 },


    // Add more data points here
  ];

  return (
    <div className="revenue-chart">
      <h3>Revenue Growth</h3>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RevenueChart;
