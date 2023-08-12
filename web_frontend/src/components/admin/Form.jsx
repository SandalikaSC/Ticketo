import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    station: '',
    mobileNumber: '',
    email: '',
    nic: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/allStations');
      console.log('Fetched stations:', response.data.stations);
      setStations(response.data.stations);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStation(selectedValue);
    setFormData({
      ...formData,
      station: selectedValue,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.station) {
      newErrors.station = 'Station is required';
      valid = false;
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Phone Number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Phone Number is invalid';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.nic) {
      newErrors.nic = 'NIC Number is required';
      valid = false;
    } else if (!/^\d{9}[vV\d]{1}$|^\d{12}$/.test(formData.nic)) {
      newErrors.nic = 'NIC Number is invalid';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/add-station-master', formData);
        console.log('Form data submitted:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="error-message">{errors.name}</div>
      </div>
      <div className="admin-form-group">
        <label htmlFor="station">Station:</label>
        <select
          id="station"
          name="station"
          value={formData.station}
          onChange={handleStationChange}
        >
          <option value="">Select a station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
        <div className="error-message">{errors.station}</div>
      </div>
      <div className="admin-form-group">
        <label htmlFor="mobileNumber">Phone Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        <div className="error-message">{errors.mobileNumber}</div>
      </div>
      <div className="admin-form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="error-message">{errors.email}</div>
      </div>
      <div className="admin-form-group">
        <label htmlFor="nic">NIC Number:</label>
        <input
          type="text"
          id="nic"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
        />
        <div className="error-message">{errors.nic}</div>
      </div>
      {/* <div className="admin-form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div> */}
      <div className="admin-buttons-container">
        <button className="admin-form-button" type="submit">Submit</button>
        <button className="admin-cancel-button" type="reset">Cancel</button>
      </div>
    </form>
  );
};

export default Form;
