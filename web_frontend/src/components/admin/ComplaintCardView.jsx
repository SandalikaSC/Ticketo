import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintCardView = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaint data from the database or API
    axios.get('http://your-api-endpoint.com/complaints')
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
      });
  }, []);

  return (
    <div>
      <h1>Complaints</h1>
      <div className="complaint-card-list">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <h2>Complaint ID: {complaint.id}</h2>
            <p>Complainant: {complaint.complainant}</p>
            <p>Subject: {complaint.subject}</p>
            <p>Details: {complaint.details}</p>
            <p>Status: {complaint.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintCardView;
