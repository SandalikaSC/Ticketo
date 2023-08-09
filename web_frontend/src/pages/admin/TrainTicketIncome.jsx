import React from 'react';
import DashboardCard from '../../components/admin/DashboardCard';
// import MonthlyIncomeChart from '../../components/admin/MonthlyIncomeChart';
// import TicketTypePieChart from '../../components/admin/TicketTypePieChart';
import DailyIncomeTable from '../../components/admin/DailyIncomeTable';
import '../../css/admin_earnings.css';

const TrainTicketIncome = () => {
  // Dummy data for demonstration
  const systemIncome = "LKR 475,000,000";
  const monthlyIncome = "LKR 650,000";
  const todayIncome = "LKR 100,000"

  return (
    <div className="dashboard">
      <div className="flex-cards-container">
        <DashboardCard title="Train Ticket Income through System" value={systemIncome} />
        <DashboardCard title="This Month Train Ticket Income" value={monthlyIncome} />
        <DashboardCard title="Today Train Ticket Income" value={todayIncome} />


      </div>

    {/* //   <div className="charts-container">
    //     <div className="chart-card">
    //       <h2>Monthly Income </h2>
    //       <MonthlyIncomeChart />
    //     </div>
    //     <div className="chart-card">
    //       <h2>Income from Different Ticket Types</h2>
    //       <TicketTypePieChart />
    //     </div>
    //   </div> */}

    <h3>Daily Income from Stations</h3>
      <div className="table-container">
      
        <DailyIncomeTable /> 
      </div>
    </div>
  );
};

export default TrainTicketIncome;
