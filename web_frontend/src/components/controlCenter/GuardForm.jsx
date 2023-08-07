import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Paper } from '@material-ui/core';

const GuardForm = ({ onClose }) => {
  return (
    <Paper elevation={3} style={{ position: 'fixed', top: 0, right: 0, width: '50%', height: '100%', padding: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>
      {/* Form fields go here */}
      <Typography variant="h4" style={{ marginBottom: '10px' }}>
        Add Guard Details
      </Typography>
      <TextField label="First Name" fullWidth margin="normal" />
      <TextField label="Last Name" fullWidth margin="normal" />
      <TextField label="NIC" fullWidth margin="normal" />
      {/* ... Add more form fields as needed */}
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Add Guard
        </Button>
        <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Paper>
  );
};

const TrainGuardDetails = () => {
  const [isAddingGuard, setIsAddingGuard] = useState(false);

  const handleAddGuardClick = () => {
    setIsAddingGuard(true);
  };

  const handleCloseForm = () => {
    setIsAddingGuard(false);
  };

  return (
    <Container style={{ backgroundColor: '#ececec', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h2" style={{ marginBottom: '10px' }}>
        Train Guard Details
      </Typography>
      <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
      <Button variant="contained" color="primary" style={{ marginBottom: '10px' }} onClick={handleAddGuardClick}>
        Add Guard Details
      </Button>
      <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
      <Paper elevation={3} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField label="First Name" style={{ marginRight: '10px' }} />
              <TextField label="Last Name" style={{ marginRight: '10px' }} />
              <TextField label="NIC" style={{ marginRight: '10px' }} />
              <Button variant="contained" color="primary">
                Search
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
      <Grid container spacing={2}>
        {/* Guard detail cards */}
        <Grid item xs={12} sm={6} style={{ flexBasis: '45%', marginRight: '10px' }}>
          <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
            {/* Card content */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} style={{ flexBasis: '45%' }}>
          <Paper elevation={3} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
            {/* Card content */}
          </Paper>
        </Grid>
        {/* ... Add more guard detail cards here */}
      </Grid>
      {isAddingGuard && <GuardForm onClose={handleCloseForm} />}
    </Container>
  );
};

export default TrainGuardDetails;
