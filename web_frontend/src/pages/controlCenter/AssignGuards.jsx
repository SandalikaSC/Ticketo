import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Popup from "../../components/controlCenter/popup"

const AssignGuards = () => {
  const [selectedTrain, setSelectedTrain] = useState('');
  const [isAddingGuard, setIsAddingGuard] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    mobile: "",
    train: ""
  });

  const [errors, setErrors] = useState({}); 

  const handleSave = async(event) => {
    event.preventDefault();

    console.log("AYO!!");
  }

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData({
      ...formData,
      [name]: value,
  });

  setErrors({
      ...errors,
      [name]: undefined,
  });
};

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const guards = [
    {
      name: 'Nadeeka Silva',
      NIC: '789645199V',
      phone: '077-1236547',
      schedule: 'Monday to Friday, 9AM - 5PM'
    }
  ];

  const trainSchedules = [
    {
      start: 'Beliatta',
      destination: 'Maradana',
      startTime: '04:00',
      finishTime: '10:00',
      route: 'Coastal Line',
      isSelected: false
    },
    {
      start: 'Maradana',
      destination: 'Beliatta',
      startTime: '14:00',
      finishTime: '20:00',
      route: 'Coastal Line',
      isSelected: false
    }
  ];

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/alltrains");
      setTrains(response.data.trains);
      trains.forEach(element => {
        console.log(element);
      });
      
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async (trainID) => {
    console.log("This methdo");
        
    try{
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(
            "http://localhost:5000/api/get-schedule-for-train",
            { trainId: trainID },
            { headers }
            );
        console.log("responeseeefefrfr");
        setSchedules(response.data.schedules);
        console.log(schedules);
    }catch(error){
        console.error("Error fetching schedules:", error);
    }
};

  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const handleSelectSchedule = (index) => {
    const updatedSchedules = [...trainSchedules];
    updatedSchedules[index].isSelected = !updatedSchedules[index].isSelected;
    setSelectedSchedules(updatedSchedules);
  };  

  const handleAddGuardClick = () => {
    setIsAddingGuard(true);
  };

  const handleCloseForm = () => {
    setIsAddingGuard(false);
  };

  let trainName;

  return (
    <Container style={{ padding: '20px', display: 'flex', height: '115vh' }}>

      {/* Left Section */}
      <div style={{ width: '60%', padding: '10px', backgroundColor: 'white',borderRadius: '10px',overflowY: 'auto',marginRight: '10px'  }}>
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#3D50AC', textAlign: 'center' }}>
          <b>All Train Guards</b>
        </Typography>
        {guards.map((guard, index) => (
          <Paper key={index} elevation={5} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px', marginLeft: '10px', backgroundColor: '#ccc', flex: 1.5 }}>
                  <img src="#" style={{ width: '100%', height: '100%', borderRadius: '100%' }} />
                </div>

                <div style={{ flex: 4,marginLeft: '20px' }}>
                  <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1 }}>Name:</div>
                    <div style={{flex: 2}}>{guard.name}</div>
                  </div>

                  <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1  }}>NIC:</div>
                    <div style={{flex: 2}}>{guard.NIC}</div>
                  </div>

                  <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1  }}>Phone:</div>
                    <div style={{ flex: 2 }}>{guard.phone}</div>
                  </div>

                  <div style={{ display: 'flex', marginBottom: '10px'  }}>
                    <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1  }}>Schedule:</div>
                    <div style={{ flex: 2 }}>
                      <Button variant="outlined" color="secondary" style={{ width: '80%', }} >
                        View Schedule
                      </Button>
                    </div>                    
                  </div>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex:2, marginTop: '20px' }}>
                  <Button variant="contained" color="primary" style={{ marginLeft: '10px', marginBottom: '10px' }}>
                    Edit Schedule
                  </Button>
                  <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#FF5733', color: '#fff' }}>
                    Delete Guard
                  </Button>
                </div>
              </div>

              
            </div>
          </Paper>
        ))}
      </div>

      {/* Right Section */}
      <div style={{ width: '45%', padding: '10px', backgroundColor: 'white', borderRadius: '10px', marginLeft: '10px',overflowY: 'auto' }}>
        <Typography variant="h4" style={{ marginBottom: '10px', color: '#3D50AC', textAlign: 'center' }}>
          <b>Add Guard Details</b>
        </Typography> 

        <form onSubmit={handleSave}>
          <TextField 
            label="First Name" 
            margin="normal" 
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            fullWidth />

          <TextField 
          label="Last Name" 
          margin="normal"
          type='text'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange} 
          fullWidth />

          <TextField 
          label="Email" 
          margin="normal"
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange} 
          fullWidth />

          <TextField 
          label="NIC" 
          margin="normal" 
          type='text'
          name='nic'
          value={formData.nic}
          onChange={handleChange}
          fullWidth />

          <TextField 
          label="Mobile Number" 
          margin="normal" 
          type='text'
          name='mobile'
          value={formData.mobile}
          onChange={handleChange}
          fullWidth />

          <InputLabel>Select Train</InputLabel>
          <select
              name="train"
              value={formData.train}
              onChange={handleChange}
              label="Train"
              fullWidth
              style={{marginBottom: '10px'}}
              className="scheduleSelect"
          >
                      
            {trains.map((train) => (
            <option key={train.trainId} value={train.trainId}>
                
                {train.trainName}
            </option>
            ))}
        </select>
        </form>

        {/* Display train schedules based on selectedTrain */}
        {fetchSchedules(formData.train)}
        {formData.train && (
          <div style={{ marginTop: '20px' }}>

            <Typography variant="h6" style={{ color: '#3D50AC', textAlign: 'center' }}>
              <b>Available schedules for </b>
            </Typography>
            {schedules.map((schedule, index) => (
              <div key={index} style={{ marginTop: '10px' }}>

                <Paper key={index} elevation={5} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>            
                 
                  <div style={{ display: 'flex' }}>

                    <div style={{ flex: 4 }}>
                      <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 2 }}>Start:</div>
                        <div style={{flex: 2}}>{schedule.start}</div>
                      </div>

                      <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 2  }}>Destination:</div>
                        <div style={{flex: 2}}>{schedule.destination}</div>
                      </div>

                      <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 2  }}>Starting Time:</div>
                        <div style={{ flex: 2 }}>{schedule.startTime}</div>
                      </div>

                      <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 2  }}>Finishing Time:</div>
                        <div style={{ flex: 2 }}>{schedule.finishTime}</div>
                      </div>

                      <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 2  }}>Route:</div>
                        <div style={{ flex: 2 }}>{schedule.route}</div>
                      </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <Button variant="contained" color="primary" style={{ marginLeft: '10px', marginBottom: '10px' }} onClick={() => handleSelectSchedule(index)}>
                        {schedule.isSelected ? (
                          <Checkbox
                            checked={schedule.isSelected}
                            onChange={() => handleSelectSchedule(index)}
                            color="primary"
                          />
                        ) : (
                          "Select Schedule"
                        )}
                      </Button>
                    </div>

                  </div>                   
                  
                </Paper>
                
              </div>
            ))}
          </div>
        )}


        <Button variant="contained" color="primary" fullWidth onClick={handleButtonClick}>
          Add Guard
        </Button>
        
        {isPopupOpen && (
        <Popup message="Driver added successfully" onClose={handleClosePopup} />
        )}

      </div>
    </Container>
  );
};

export default AssignGuards;
