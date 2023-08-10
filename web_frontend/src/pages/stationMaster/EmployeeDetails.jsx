import React from 'react';
import EmpCard from '../../components/stationMaster/EmpCard'; // Update the path to EmpCard component if necessary
import '../../css/sm_dashboard.css';
import userImage from '../../assets/user2.png'; // Update the path as needed
import empImage from '../../assets/user3.png'; 
import empoImage from '../../assets/user6.png'; 
import usersImage from '../../assets/user7.png'; 


// Sample employee data
const employees = [
  {
    role: 'Ticket Clerk',
    emp_image: userImage, // Use the imported image
    name: 'Shenil Perera',
    nic: '947006431V',
    email: 'shenil@gmail.com',
    phone: '077-6784325'
  },
  {
    role: 'Ticket Checker',
    emp_image: empImage, // Use the imported image
    name: 'Kevin De Silva',
    nic: '887654321V',
    email: 'kevin12@gmail.com',
    phone: '075-1234567'
  },
  {
    role: 'Ticket Clerk',
    emp_image: usersImage, // Use the imported image
    name: 'Sunil Perera',
    nic: '897006431V',
    email: 'sunil@gmail.com',
    phone: '077-6784325'
  },
  {
    role: 'Ticket Checker',
    emp_image: empoImage, // Use the imported image
    name: 'Anil De Silva',
    nic: '907654321V',
    email: 'anil012@gmail.com',
    phone: '074-1234567',
  }
];

const EmployeeDetails = () => {
  return (
    <div className="employee-details-container">
      <h1 className="section-heading">Employee Details</h1>
      <h2 className="sub-section-heading"> Galle Railway Station</h2>

      <div className="employee-card-container">
        {employees.map((employee, index) => (
          <EmpCard key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetails;
