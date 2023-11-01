import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ResolveForm = ({ complaintData, onResolve }) => {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect form data and call onResolve
    onResolve({ comment, message });

    // Show a success SweetAlert when the form is submitted
    Swal.fire({
      title: 'Complaint Resolved',
      text: 'The complaint has been resolved successfully.',
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        // You can add any specific action you want to perform here.
        // For example, clear the form fields or close the SweetAlert.
        // This code will keep the user on the current page.
      }
    });
  };

  return (
    <form className="resolve-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Action:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResolveForm;
