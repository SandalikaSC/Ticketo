import React from 'react';

const complaints = ({ complaint }) => {
  return (
    <div className="complaint-card">
      <h2>Complaint ID: {complaint.id}</h2>
      <p>Complainant: {complaint.complainant}</p>
      <p>Subject: {complaint.subject}</p>
      <p>Details: {complaint.details}</p>
      <p>Status: {complaint.status}</p>
    </div>
  );
};

export default complaints;
