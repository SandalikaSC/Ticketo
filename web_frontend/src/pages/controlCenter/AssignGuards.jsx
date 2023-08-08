import React, { useState } from 'react';
// import { Container, Typography, Button, TextField, Grid, Paper } from '@material-ui/core';
import { Container, Typography, Button, TextField, Grid, Paper, IconButton,
  InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff, Add } from '@mui/icons-material';

const GuardForm = ({ onClose }) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
      setSelectedFile(file);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

          <Typography variant="h4" style={{ marginBottom: '10px' }}>
            Add Guard Details
          </Typography>
          <br></br>

          <TextField label="First Name" fullWidth margin="normal" />
          <TextField label="Last Name" fullWidth margin="normal" />
          <TextField label="Email" fullWidth margin="normal" />
          <TextField label="NIC" fullWidth margin="normal" />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* ... Add more form fields as needed */}
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
 

const AssignGuards = () => {

  const [isAddingGuard, setIsAddingGuard] = useState(false);

  const handleAddGuardClick = () => {
    setIsAddingGuard(true);
  };

  const handleCloseForm = () => {
    setIsAddingGuard(false);
  };

  return (
    <Container style={{padding: '20px'}}>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h2" style={{ marginBottom: '10px', color: '#3D50AC' }}>
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
                <Grid item xs={12} sm={3}> {/* Adjust the sm value for desired width */}
                  <Button variant="contained" color="primary">
                    Search
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '10px' }}>        {/* Cards with guard information go here */}
          {/* You can create separate components for each card */}
          <Paper elevation={3} style={{ display: 'flex', flexBasis: '47%',alignItems: 'center', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#ccc' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Name:</div>
                <div>John Doe</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>NIC:</div>
                <div>123456789</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Phone:</div>
                <div>+1 123-456-7890</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Assigned Train:</div>
                <div>Train A</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                  Edit Schedule
                </Button>
                <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#FF5733', color: '#fff' }}>
                  Delete Guard
                </Button>
              </div>
            </div>
          </Paper>

          <Paper elevation={3} style={{ display: 'flex', flexBasis: '47%',alignItems: 'center', marginBottom: '10px', padding: '10px', borderRadius: '10px'}}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#ccc' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Name:</div>
                <div>John Doe</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>NIC:</div>
                <div>123456789</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Phone:</div>
                <div>+1 123-456-7890</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Assigned Train:</div>
                <div>Train A</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Edit Schedule
                </Button>
                <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#FF5733', color: '#fff' }}>
                  Delete Guard
                </Button>
              </div>
            </div>
          </Paper>

          <Paper elevation={3} style={{ display: 'flex', flexBasis: '47%',alignItems: 'center', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#ccc' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Name:</div>
                <div>John Doe</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>NIC:</div>
                <div>123456789</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Phone:</div>
                <div>+1 123-456-7890</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Assigned Train:</div>
                <div>Train A</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Edit Schedule
                </Button>
                <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#FF5733', color: '#fff' }}>
                  Delete Guard
                </Button>
              </div>
            </div>
          </Paper>

          <Paper elevation={3} style={{ display: 'flex', flexBasis: '47%',alignItems: 'center', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#ccc' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Name:</div>
                <div>John Doe</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>NIC:</div>
                <div>123456789</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Phone:</div>
                <div>+1 123-456-7890</div>
              </div>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold', minWidth: '100px' }}>Assigned Train:</div>
                <div>Train A</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Edit Schedule
                </Button>
                <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: '#FF5733', color: '#fff' }}>
                  Delete Guard
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {isAddingGuard && <GuardForm onClose={handleCloseForm} />}
    </Container>
  );
};

export default AssignGuards;
