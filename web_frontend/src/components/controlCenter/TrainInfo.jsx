import React, { useState } from 'react';
import Drawer from './Drawer';
import { Container, Typography, Divider, Paper, Button } from '@mui/material';

const TrainInfo = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Map */}
      <div style={{ flex: 1 }}>
        {/* Insert your map component here */}
      </div>

      <Drawer isOpen={isDrawerOpen}>
        {/* Content inside the drawer */}
        <div>
            <Typography variant="h3" style={{ marginBottom: '10px', color: '#3D50AC' }}>
                <b>Ella Express</b>
                <Typography variant="h5" style={{ marginBottom: '10px', color: '#F86F5D' }}>
                <b>T2341</b>
                </Typography>
            </Typography>
            
            <Divider style={{ marginBottom: '20px' }} />

          {/* Delay times list */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Typography variant="body1">Last Station:</Typography></li>
                    <li><Typography variant="body1">Arrival Time:</Typography></li>
                    <li><Typography variant="body1">Delay at Arrival:</Typography></li>
                    <li><Typography variant="body1">Waiting Time:</Typography></li>
                    <li><Typography variant="body1">Delay at Waiting:</Typography></li>
                    <li><Typography variant="body1">Departure Time:</Typography></li>
                    <li><Typography variant="body1">Delay at Departure:</Typography></li>
                    <li><Typography variant="body1">Reasons for Delay:</Typography></li>
                    
                </ul>
            </div>
            <div style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Typography variant="body1" color="textSecondary">Hikkaduwa</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">08.00 AM</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">10 Minutes</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">5 Minutes</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">2 Minutes</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">8.15 AM</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">12 Minutes</Typography></li>
                    <li><Typography variant="body1" color="textSecondary">Repairs in the railway line</Typography></li>
                </ul>
            </div>
          </div>

            <Divider style={{ marginBottom: '20px' }} />

            <details>
            <summary style={{ cursor: 'pointer', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px' }}>
                View Next Stations
            </summary>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Typography variant="body1"><b>Station</b></Typography></li>
                        
                        {/* Station names start here */}
                        <li><Typography variant="body1" color="textSecondary">Ambalangoda</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">Kaluthara</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">Panadura</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">Moratuwa</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">Bambalapitiya</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">Colombo Fort</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">Maradana</Typography></li>


                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Typography variant="body1"><b>Estimated Arrival</b></Typography></li>

                        {/* Times go here */}
                        <li><Typography variant="body1" color="textSecondary">08.30 AM</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">08.45 AM</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">09.00 AM</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">09.10 AM</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">09.25 AM</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">09.45 AM</Typography></li>
                        <li><Typography variant="body1" color="textSecondary">10.00 AM</Typography></li>

                    </ul>
                </div>
            </div>
            </details>

            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => alert('Notify all next stations')}
                >
                Notify All Next Stations
                </Button>
            </div>
        </div>
      </Drawer>
      
    </div>
  );
};

export default TrainInfo;
