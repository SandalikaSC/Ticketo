import React from 'react';

const DailyIncomeTable = () => {
  // Dummy data for demonstration
  const tableData = [
    { date: '2023-08-01', stationNo: '001', stationName: 'Maradana', dailyIncome: "4,000,000" },
    { date: '', stationNo: '002', stationName: 'Colombo Fort', dailyIncome: "4,500,000" },
    { date: '', stationNo: '003', stationName: 'Gampaha', dailyIncome: "600,000" },
    { date: '', stationNo: '004', stationName: 'Galle', dailyIncome: "900,000" },
    { date: '', stationNo: '005', stationName: 'Matara', dailyIncome: "950,000" },
    { date: '', stationNo: '006', stationName: 'Moratuwa', dailyIncome: "800,000" },
    { date: '', stationNo: '007', stationName: 'Panadura', dailyIncome: "900,000" },
    { date: '', stationNo: '008', stationName: 'Kaluthara South', dailyIncome: "2,000,000" },
    { date: '', stationNo: '009', stationName: 'Hikkaduwa', dailyIncome: "400,000" },
    { date: '', stationNo: '010', stationName: 'Kandy', dailyIncome: "3,000,000" },
    { date: '', stationNo: '011', stationName: 'Polgahawela', dailyIncome: "900,000" },
    { date: '', stationNo: '012', stationName: 'Rambukkana', dailyIncome: "900,000" },
    { date: '', stationNo: '013', stationName: 'Aluthgama', dailyIncome: "500,000" },
    { date: '', stationNo: '014', stationName: 'Dehiwala', dailyIncome: "350,000" },
    { date: '', stationNo: '015', stationName: 'Nanu Oya', dailyIncome: "900,000" },
    { date: '', stationNo: '016', stationName: 'Anuradapura', dailyIncome: "2,000,000" },
    { date: '', stationNo: '017', stationName: 'Peradeniya', dailyIncome: "900,000" },
    { date: '', stationNo: '018', stationName: 'Haputhale', dailyIncome: "700,000" },

    
  ];

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Station No</th>
            <th>Station Name</th>
            <th>Daily Income</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.stationNo}</td>
              <td>{row.stationName}</td>
              <td>{row.dailyIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyIncomeTable;
