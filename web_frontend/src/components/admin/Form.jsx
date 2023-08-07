import React, { useState } from 'react';
import axios from 'axios';



const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    station: '',
    mobileNumber: '',
    email: '',
    nic: '',
    password: '', // New password field
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/api/add-station-master', formData);

    
      console.log('Form data submitted:', response.data);
    } catch (error) {
      
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
    
      <div>
        <label htmlFor="mobileNumber">Phone Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="nic">NIC Number:</label>
        <input
          type="text"
          id="nic"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
        />
      </div>
     
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
