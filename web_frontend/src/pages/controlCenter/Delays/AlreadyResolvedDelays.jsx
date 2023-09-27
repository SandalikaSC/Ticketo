import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Select, MenuItem, Button, TextField, FormControl, 
  InputLabel, Grid, Card, CardContent } from '@mui/material';
import DelayReportCard from '../../../components/controlCenter/DelayReportCard';
import Reports from '../../../components/controlCenter/Reports';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const AlreadyResolvedDelays = () => {

  const notifications = [
    { trainName: 'Sagarika', number: 'T1234', destination: 'Katugoda', currentLocation: 'Colombo', arrival: '7.00AM', delay: '2' },
    { trainName: 'Ella Express', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
    { trainName: 'Ruhunu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
    { trainName: 'Rajarata Rajini', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
    { trainName: 'Badulu Express', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
    { trainName: 'Seethawaka Rajina', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },   
  ];

  const [delayReports, setDelayReports] = useState([]);

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    // Handle sort change here
    console.log('Selected sort:', selectedValue);
  };

  const handleShowReports = () => {
    // Simulate fetching data from an API

    const mockData = [
      {
        trainName: 'Express Train',
        trainNumber: '123',
        date: '2023-08-10',
        departureStation: 'Station A',
        arrivalTime: '12:00 PM',
        delay: 30,
        reason: 'Signal issue',
      },
      {
        trainName: 'Express Train',
        trainNumber: '123',
        date: '2023-08-10',
        departureStation: 'Station A',
        arrivalTime: '12:00 PM',
        delay: 30,
        reason: 'Signal issue',
      },
      {
        trainName: 'Express Train',
        trainNumber: '123',
        date: '2023-08-10',
        departureStation: 'Station A',
        arrivalTime: '12:00 PM',
        delay: 30,
        reason: 'Signal issue',
      },
      {
        trainName: 'Express Train',
        trainNumber: '123',
        date: '2023-08-10',
        departureStation: 'Station A',
        arrivalTime: '12:00 PM',
        delay: 30,
        reason: 'Signal issue',
      },
    ];

    setDelayReports(mockData);
  };

  // Search starts here
  const [stationName, setStationName] = useState("");
  const [filterOption, setFilterOption] = useState(""); // Added filterOption state
    
  const handleStationNameChange = (event) => {
      setStationName(event.target.value);
  };

  const handleFilterChange = (event) => {
      setFilterOption(event.target.value); // Handle filter option change
  };

  const handleSearch = () => {
    // Logic to search for delays
    console.log("Searching for delays:", stationName, "Filter by:", filterOption);
  };
  // Search ends here


  return (
    <Container style={{ padding: '20px' }}>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" style={{color: '#3D50AC', flex: 4, marginBottom: '20px ' }}>

        {/* <Typography variant="h4" style={{color: '#3D50AC', flex: 4, marginBottom: '10px' }}> */}

            <b>Train Delay Reports</b>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleShowReports}
          style={{ maxHeight: '50px', minWidth: '30px', minHeight: '50px',flex:1}}
        >
            Get Report
        </Button>

      </div>

      <Divider style={{ marginBottom: '20px' }} />


      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link to='/cc/delays' style={{ textDecoration: 'none', flex: 1  }}>
              <Button variant="outlined" color="primary" style={{ flex: 1, fontWeight: 'bold' }}>
                  To be Resolved
              </Button>
          </Link>

          <Link to="/cc/alreadyresolveddelays" style={{ textDecoration: 'none', flex: 1  }}>
              <Button 
              variant="outlined" 
              color="primary" 
              style={{ 
                flex: 1, 
                fontWeight: 'bold',
                backgroundColor: '#1976d2',
                color: 'white' }}>
                  Already Resolved
              </Button>
          </Link>

        <div style={{flex: 3}}></div>
        

        <FormControl fullWidth variant="outlined" margin="normal" style={{ marginRight: 10, height: '100%', flex: 2 }}>
          <InputLabel htmlFor="filterDelays">
            Filter Delays
          </InputLabel>
          <Select
            label="Filter by"
            inputProps={{
              name: "filterDelays",
              id: "filterDelays",
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="Yesterday">Yesterday</MenuItem>
            <MenuItem value="Last week">This week</MenuItem>
            <MenuItem value="Last Two Weeks">Last two weeks</MenuItem>
            <MenuItem value="This Month">This month</MenuItem>
            <MenuItem value="This Year">This year</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleShowReports}
          style={{ maxHeight: '50px', minWidth: '30px', minHeight: '50px',flex:1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop: '20px' }}
        >
          Search
        </Button> 
           
      </div>

      <Divider style={{ marginBottom: '20px' }} />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'Repeat(3, 1fr)',
        gap: '10px'
        }}>
        {notifications.map((notification, index) => (
          <Paper key={index} elevation={3} style={{ display: 'flex', marginBottom: '10px', borderRadius: '10px' }}>
            <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #ccc' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                        {notification.trainName}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#3D50AC' }}>
                        {notification.number}
                    </Typography>
                </div>
            </div>

            <div style={{ flex: 3, padding: '10px', borderRight: '1px solid #ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                        <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                            <b>Delayed Location :</b>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                            <br></br>
                            {notification.currentLocation}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                        <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                            <b>Notified Time :</b>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                            <br></br>
                            {notification.arrival}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                        <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                            <b>Delayed Duration :</b>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                            <br></br>
                            {notification.delay} minutes
                        </Typography>
                    </div>
                </div>
            </div>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default AlreadyResolvedDelays;
