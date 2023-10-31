import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Divider, Paper, Select, MenuItem, Button, TextField, FormControl, 
  InputLabel, Grid, Card, CardContent } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Stations = () => {

    const [filterOption, setFilterOption] = useState(""); // Added filterOption state
    const [stationName, setStationName] = useState("");
    
    const handleStationNameChange = (event) => {
        setStationName(event.target.value);
    };

    const [stations, setStations] = useState([]);

    useEffect(() => {
      fetchStations();
    }, []);

    const fetchStations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allstations");
        setStations(response.data.stations);
        console.log(typeof(stations));
        stations.forEach(element => {
          console.log(element);
        });

        

        // const response2 = await axios.get("http://localhost:5000/api/getStationMaster", {
        //   data: stations, // Pass 'stations' as data if required by the backend
        // });
        
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value); // Handle filter option change
    };

    const handleSearch = () => {
        // Logic to search for stations based on the 'stationName' and 'filterOption'
        // Implement API calls or any other logic here.
        console.log("Searching for station:", stationName, "Filter by:", filterOption);
    };

    return (
        <Container style={{ padding: '20px' }}>

          <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" style={{color: '#3D50AC', flex: 4 }}>
                  <b>Find Train Stations</b>
              </Typography>

              <FormControl fullWidth variant="outlined" margin="normal" style={{ marginRight: 10, height: '100%', flex: 2 }}>
                <InputLabel htmlFor="filterStations">
                  Filter Stations
                </InputLabel>

                <Select
                  label="Filter by"
                  inputProps={{
                    name: "filterStations",
                    id: "filterStations",
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Ascending order">Ascending order</MenuItem>
                  <MenuItem value="Descending order">Descending order</MenuItem>
                  <MenuItem value="Province">Province</MenuItem>
                  <MenuItem value="Main line">Main line</MenuItem>
                  <MenuItem value="Northern line">Northern line</MenuItem>
                  <MenuItem value="Mannar line">Mannar line</MenuItem>
                  <MenuItem value="Baticoloa line">Baticoloa line</MenuItem>
                  <MenuItem value="Trincomalee line">Trincomalee line</MenuItem>
                  <MenuItem value="Puttalam line">Puttalam line</MenuItem>
                  <MenuItem value="Kelaniwali line">Kelaniwali line</MenuItem>
                  <MenuItem value="Coastal line">Coastal line</MenuItem>
                </Select>
              </FormControl>

              <TextField
                  label="Station Name"
                  variant="outlined"
                  fullWidth
                  value={stationName}
                  onChange={handleStationNameChange}
                  style={{ marginRight: 10, flex: 1, height: '100%', flex: 2 }}
              />

              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '50px', flex: 1 }}
              >
                  <FaSearch />
              </Button>
          </div>
          <Divider style={{ marginBottom: '20px' }} />

          <Grid container spacing={2}>
              {stations.map((station, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                          <CardContent>
                              <div style={{display: 'flex'}}>
                              <Typography variant="h6" style={{flex: 1}}>{station[1]}</Typography>
                              <Typography variant="h6" color="#3d51a9" style={{flex: 1}}>{station[0]}</Typography>
                              </div>
                              
                              <Divider style={{ marginBottom: '20px' }} />

                              <div style={{ display: 'flex', marginTop: '15px' }}>
                                  <div style={{ flex: 1 }}>
                                      <Typography variant="subtitle1"><b>Location:</b> {station[3]} , {station[4]}</Typography>
                                      <Typography variant="subtitle1">SM: {station[6]+ " "+ station[7]}</Typography>
                                      <Typography variant="subtitle1">SM Contact: {station[8]}</Typography>
                                      <Typography variant="subtitle1">Station Contact: {station[2]}</Typography>
                                      <Typography variant="subtitle1">Station Master Login Status: {station[9]}</Typography>
                                  </div>
                                  <div style={{ flex: 1 }}>
                                      <Typography variant="subtitle1" color="textSecondary">{station.location}</Typography>
                                      <Typography variant="subtitle1" color="textSecondary">{station.sm}</Typography>
                                      <Typography variant="subtitle1" color="textSecondary">{station.sm_contact}</Typography>
                                      <Typography variant="subtitle1" color="textSecondary">{station.phone}</Typography>
                                      <Typography variant="subtitle1" color="textSecondary">{station.trainLine}</Typography>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </Grid>
              ))}
          </Grid>

          
        </Container>
    );
};

export default Stations;
