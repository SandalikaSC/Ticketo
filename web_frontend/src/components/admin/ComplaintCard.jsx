// ComplaintCard.js
import React, { useState } from 'react';
import ResolveForm from '../../components/admin/ResolveForm';

const ComplaintCard = ({ id, complaintBy, date, complaint, userImage, onResolve }) => {
  const [showResolveForm, setShowResolveForm] = useState(false);

  const handleResolveClick = () => {
    setShowResolveForm(true);
  };

  const handleResolveFormClose = () => {
    setShowResolveForm(false);
  };

  return (
    <div className="complaint-card">
      {showResolveForm ? (
        <ResolveForm
          complaintData={{ id, complaint, complaintBy }}
          onClose={handleResolveFormClose}
          onResolve={(resolvedData) => {
            onResolve(resolvedData);
            setShowResolveForm(false);
          }}
        />
      ) : (
        <>
          <div className="complaint-info">
            <span className="complaint-id">Complaint ID: {id}</span>
            <span className="complaint-by">Complaint By: {complaintBy}</span>
            <span className="complaint-date">Date: {date}</span>
            <span className="complaint-text">Complaint: {complaint}</span>
          </div>
          <button className="resolve-btn" onClick={handleResolveClick}>
            Resolve
          </button>
        </>
      )}
    </div>
  );
};

export default ComplaintCard;
