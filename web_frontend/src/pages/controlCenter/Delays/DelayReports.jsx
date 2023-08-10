import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Select, MenuItem, Button, TextField, FormControl, 
  InputLabel, Grid, Card, CardContent } from '@mui/material';import DelayReportCard from './../../../components/controlCenter/DelayReportCard';
import Reports from './../../../components/controlCenter/Reports';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const DelayReports = () => {
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
        <Typography variant="h4" style={{color: '#3D50AC', flex: 4 }}>
            <b>Train Delay Reports</b>
        </Typography>
      </div>
      <Divider style={{ marginBottom: '20px' }} />

      <div style={{display: 'flex', flex: 2}}></div>

      <div style={{ display: 'flex', flex: 2, gap: '10px', marginBottom: '20px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="outlined" color="primary" style={{ flex: 1, fontWeight: 'bold' }}>
            To be Resolved
            </Button>
            <Button variant="outlined" color="primary" style={{ flex: 1, fontWeight: 'bold' }}>
            Already Resolved
            </Button>
            <div style={{ flex: 1 }}>
                <Link to="/cc/delayreports" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary" style={{ width: '100%', fontWeight: 'bold' }}>
                    Reports
                </Button>
                </Link>
            </div>               
        </div>
        
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

        <TextField
            label="Train Name"
            variant="outlined"
            fullWidth
            value={stationName}
            onChange={handleStationNameChange}
            style={{ marginRight: 10, flex: 1, height: '100%', flex: 2 }}
        />

        <Button
            variant="contained"
            color="primary"
            onClick={handleShowReports}
            style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '50px', flex: 1 }}
        >
            <FaSearch />
        </Button>
        
      </div>
      <Button
        variant="contained">
          Get Report
      </Button>

      <br></br>
      <Reports delayReports={delayReports} />
    </Container>
  );
};

export default DelayReports;
