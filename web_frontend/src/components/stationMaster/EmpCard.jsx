import React from 'react';
// import './EmpCard.css';

const EmpCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <img src={employee.emp_image}  />
      <h2>{employee.role}</h2>
      <p>Name: {employee.name}</p>
      <p>NIC: {employee.nic}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>

      <button variant="contained" color="primary">
        Edit
      </button>
    </div>

    
  );
};

export default EmpCard;
