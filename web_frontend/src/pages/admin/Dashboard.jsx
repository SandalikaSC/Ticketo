import React from 'react';
import Header from '../../components/admin/Header';
import DashboardCard from '../../components/admin/DashboardCard';
import RevenueChart from '../../components/admin/RevenueChart';
import MonthlyUsageGraph from '../../components/admin/MonthlyUsageGraph';
import StationMastersList from '../../components/admin/StationMastersList';
import TrainGuardsList from '../../components/admin/TrainGuardsList';
import '../../dashboard.css';


const Dashboard = () => {
  // Dummy data for the four cards
  const dashboardCardsData = [
    { title: 'Total Income', value: 100000 },
    { title: 'Total Passengers', value: 5000 },
    { title: 'Total Transactions', value: 2000 },
    { title: 'Total Station Masters', value: 10 },
  ];

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-cards">
        {dashboardCardsData.map((card, index) => (
          <DashboardCard key={index} title={card.title} value={card.value} />
        ))}
      </div>
      <div className="dashboard-charts">
        <RevenueChart />
        <MonthlyUsageGraph />
      </div>
      <div className="dashboard-lists">
        <StationMastersList />
        <TrainGuardsList />
      </div>
    </div>
  );
};

export default Dashboard;
