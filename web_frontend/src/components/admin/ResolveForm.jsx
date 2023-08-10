// ResolveForm.js
import React, { useState } from 'react';

const ResolveForm = ({ complaintData, onResolve }) => {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect form data and call onResolve
    onResolve({ comment, message });
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
