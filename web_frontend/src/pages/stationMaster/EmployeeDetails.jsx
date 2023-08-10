import React from 'react';
import EmpCard from '../../components/stationMaster/EmpCard'; // Update the path to EmpCard component if necessary
import '../../css/sm_dashboard.css';
import '../../assets/user2.png';

// Sample employee data
const employees = [
  {
    role: 'Ticket Clerk',
    emp_image: 'user2.png',
    name: 'John Doe',
    nic: '123456789',
    email: 'john@example.com',
    phone: '123-456-7890'
  },
  {
    role: 'Ticket Checker',
    emp_image: 'emp2.jpg',
    name: 'Jane Smith',
    nic: '987654321',
    email: 'jane@example.com',
    phone: '987-654-3210'
  }
  // Add more employee data here
];

const EmployeeDetails = () => {
  return (
    <div className="employee-container">
      {employees.map((employee, index) => (
        <EmpCard key={index} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeDetails;
