import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Select, MenuItem, Button, TextField } from '@mui/material';
import {
  FaSearch
}from "react-icons/fa";
import Drawer from '../../components/controlCenter/TrackingDrawer';
import TrackingMap from '../../components/controlCenter/TrackingMap';


const TrackTrains = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
  };

  const [trainName, setTrainName] = useState("");
  
  const handleTrainNameChange = (event) => {
    setTrainName(event.target.value);
  };

  const handleSearch = () => {
      // Logic to track trains based on the 'trainName'
      // Implement API calls or any other tracking logic here.
      console.log("Searching for train:", trainName);
    };


  // return (
  //   <Container style={{ padding: '20px' }}>
      

  //     <div style={{ display: "flex", alignItems: "center" }}>
  //       <Typography variant="h2" style={{ marginBottom: '10px', color: '#3D50AC', flex:3 }}>
  //       <b>Track Train Locations</b>
  //       </Typography>

  //       <TextField
  //       label="Train Name"
  //       variant="outlined"
  //       fullWidth
  //       value={trainName}
  //       onChange={handleTrainNameChange}
  //       style={{ marginRight: 16, flex: 1 }}
  //       />

  //       <Button 
  //       variant="contained" 
  //       color="primary" 
  //       onClick={handleSearch} 
  //       sx={{ height: "100%" }}>
  //         <FaSearch /> &nbsp; Search
  //       </Button>
  //     </div>

  //   <div style={{ height: '100vh' }}>
  //     <MapContainer /> 
  //   </div>

  //   </Container>
      
  // );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

        <div style={{ flex: 1 }}>
            <TrackingMap /> 
        </div>

        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen}>
        <div style={{alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h4" style={{ marginBottom: '10px', color: '#3D50AC'}}>
            Track Train Locations
          </Typography>
        </div>

        <div style={{display: 'flex'}}>
          <TextField
          label="Train Name"
          variant="outlined"
          fullWidth
          value={trainName}
          onChange={handleTrainNameChange}
          style={{ marginRight: 10, flex: 1, height: '100%' }}
          />

          <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch} 
          style={{maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '30px'}}
          >
            <FaSearch />
          </Button>
        </div>

        <br></br>
        <Divider style={{ marginBottom: '20px' }} />

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '20px' }}>
            <Typography variant="body1" color="textSecondary" style={{ marginBottom: 0 }}>
              Train Name
            </Typography>
            <Typography variant="h5" style={{ marginTop: 0 }}>
              Udarata Manike (T1234)
            </Typography>
          </li>

          <li style={{ marginBottom: '20px' }}>
            <Typography variant="body1" color="textSecondary" style={{ marginTop: '5px', marginBottom: '0' }}>
              Last Station
            </Typography>
            
            <Typography variant="h5" style={{ margin: 0 }}>
              Gampaha
            </Typography>

            <Typography variant="body1" color="#3d51a9">
            &nbsp;(6.053519, 80.106285)
            </Typography>
            
          </li>

          <li style={{ marginBottom: '20px' }}>
            <Typography variant="body1" color="textSecondary" style={{ margin: 0 }}>
              Next Station
            </Typography>

            <Typography variant="h5" style={{ margin: 0 }}>
              Rambukkana
            </Typography>

            <Typography variant="body1" color="#3d51a9">
            (6.183519, 81.006285)
            </Typography>

          </li>

          <li>
            <Typography variant="body1" color="textSecondary" style={{ margin: 0 }}>
              Current Location
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                <Typography variant="h5" style={{ margin: 0 }}>
                  6.053519, 80.220978
                </Typography>
              </div>
              
            </div>
          </li>
</ul>


        </Drawer>

        {/* Toggle button */}
        <div  
            style={{
                position: 'absolute',
                top: '50%',
                right: isDrawerOpen ? '22.5%' : 0, // Adjust the value based on the drawer width
                transform: 'translateY(-50%)',
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'right 0.3s ease-in-out', // Add a transition effect
            }}
            onClick={handleToggleDrawer}
        >
            <div
                style={{
                    fontSize: '20px',
                }}
            >
                {isDrawerOpen ? '►' : '◄'}
            </div>
        </div>
    </div>
  );
};

export default TrackTrains; 



