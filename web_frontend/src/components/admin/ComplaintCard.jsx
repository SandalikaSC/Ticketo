import React from 'react';

const ComplaintCard = ({ id, complaintBy, date, complaint, imageUrl }) => {
  return (
    <div className="complaint-card">
      <div className="complaint-info">
        <span className="complaint-id">Complaint ID: {id}</span>
        <span className="complaint-by">Complaint By: {complaintBy}</span>
        <img className="user-image" src={imageUrl} alt="User" />
        <span className="complaint-date">Date: {date}</span>
        <span className="complaint-text">Complaint: {complaint}</span>
        
      </div>
      <button className="resolve-btn">Resolve</button>
    </div>
  );
};

export default ComplaintCard;
