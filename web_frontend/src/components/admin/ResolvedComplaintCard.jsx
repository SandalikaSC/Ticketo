import React from 'react';

const ResolvedComplaintCard = ({ id, complaintBy,imageUrl, date, complaint, actionTaken }) => {
  return (
    <div className="resolved-complaint-card">
      <div className="complaint-info">
        <span className="complaint-id">Complaint ID: {id}</span>
        <span className="complaint-by">Complaint By: {complaintBy}</span>
        <img className="user-image" src={imageUrl} alt="User" />
        <span className="complaint-date">Date: {date}</span>
        <span className="complaint-text">Complaint: {complaint}</span>
        <span className="action-taken">Action Taken: {actionTaken}</span>
       

      </div>
      <button className="remove-btn">Remove</button>
    </div>
  );
};

export default ResolvedComplaintCard;
