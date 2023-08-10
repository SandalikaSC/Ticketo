import React, { useState } from 'react';
// import { Container, Typography, Button, TextField, Grid, Paper } from '@material-ui/core';
import { Container, Typography, Button, TextField, Grid, Paper, IconButton,
  InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff, Add } from '@mui/icons-material';

const GuardForm = ({ onClose }) => {

  const guards = [
    {
        name: 'Nadeeka Silva',
        NIC: '789645199V',
        phone: '077-1236547',
        schedule: '077-1236547'
    },
    {
      name: 'Nadeeka Silva',
      NIC: '789645199V',
      phone: '077-1236547',
      schedule: '077-1236547'
    },
    {
    name: 'Nadeeka Silva',
    NIC: '789645199V',
    phone: '077-1236547',
    schedule: '077-1236547'
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>
        
        <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>

          <Typography variant="h4" style={{color: '#3D50AC'}}>
            <b>Add Guard Details</b>
          </Typography>

          <TextField label="First Name" margin="normal" style={{width: '80%'}}/>
          <TextField label="Last Name" margin="normal" style={{width: '80%'}}/>
          <TextField label="Email" margin="normal" style={{width: '80%'}}/>
          <TextField label="NIC" margin="normal" style={{width: '80%'}}/>
          {/* ... Add the schedule as needed */}

          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Add Guard
            </Button>
            <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }} onClick={onClose}>
              Cancel
            </Button>
          </div>

        </div>
      </Paper>
    </div>
  );
};

const EditScheduleForm = ({ onClose }) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    > 
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>
        
        <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>

          <Typography variant="h4" style={{color: '#3D50AC'}}>
            <b>Edit Guard Schedule</b>
 
          </Typography>

          <TextField label="First Name" margin="normal" style={{width: '80%'}}/>
          <TextField label="Last Name" margin="normal" style={{width: '80%'}}/>
          <TextField label="Email" margin="normal" style={{width: '80%'}}/>
          <TextField label="NIC" margin="normal" style={{width: '80%'}}/>
          {/* ... Add the schedule as needed */}
 
          <div style={{ marginTop: '20px' }}>
 
            <Button variant="contained" color="primary" onClick={onClose}>
              Save Schedule
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};
 

const AssignGuards = () => {
  const [isAddingGuard, setIsAddingGuard] = useState(false);
  const [isEditSchedule, setIsEditSchedule] = useState(false);

  const handleAddGuardClick = () => {
    setIsAddingGuard(true);
  };

  const handleCloseForm = () => {
    setIsAddingGuard(false);
  };

  const handleEditSchedule = () => {
    setIsEditSchedule(true);
  };

  const handleCloseEditForm = () => {
    setIsEditSchedule(false);
  };

  const guards = [
    {
      name: 'Nadeeka Silva',
      NIC: '789645199V',
      phone: '077-1236547',
      schedule: 'Monday to Friday, 9AM - 5PM'
    },
    {
      name: 'John Doe',
      NIC: '123456789',
      phone: '+1 123-456-7890',
      schedule: 'Saturday, 10AM - 3PM'
    },
    // Add more guard objects...
  ];

  return (
    <Container style={{ padding: '20px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" style={{ marginBottom: '10px', color: '#3D50AC' }}>
            <b>Train Guard Details</b>
          </Typography>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px' }} onClick={handleAddGuardClick} startIcon={<Add />}>
            Add Guard Details
          </Button>
        </div>
        <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
        <Paper elevation={3} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField label="Name" fullWidth style={{ marginRight: '10px' }} />
                <TextField label="NIC" fullWidth style={{ marginRight: '10px' }} />
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" color="primary">
                    Search
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '10px' }}>
          {guards.map((guard, index) => (

            <Paper elevation={3} style={{ display: 'flex', flexBasis: '47%', alignItems: 'center', marginBottom: '10px', padding: '10px', borderRadius: '10px' }} key={index}>
              
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>

                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#ccc', flex: 1 }}>
                  </div>

                  <div style={{ flex: 3 }}>
                    <div style={{ display: 'flex', marginBottom: '5px' }}>
                      <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1 }}>Name:</div>
                      <div style={{flex: 2}}>{guard.name}</div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '5px' }}>
                      <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1  }}>NIC:</div>
                      <div style={{flex: 2}}>{guard.NIC}</div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '5px' }}>
                      <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1  }}>Phone:</div>
                      <div style={{ flex: 2 }}>{guard.phone}</div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '5px', flex: 1  }}>
                      <div style={{ fontWeight: 'bold', minWidth: '100px', flex: 1  }}>Schedule:</div>
                      <div style={{ flex: 2 }}>{guard.schedule}</div>
                    </div>

                  </div>
                </div>
                

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleEditSchedule}>
                    Edit Schedule
                  </Button>
                  <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#FF5733', color: '#fff' }}>
                    Delete Guard
                  </Button>
                </div>
              </div>
              
              
            </Paper>
          ))}
        </div>
      </div>
      {isAddingGuard && <GuardForm onClose={handleCloseForm} />}
      {isEditSchedule && <EditScheduleForm onClose={handleCloseEditForm} />}
    </Container>
  );
};


export default AssignGuards;
