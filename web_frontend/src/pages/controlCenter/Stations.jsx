import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Select, MenuItem, Button, TextField, FormControl, 
  InputLabel, Grid, Card, CardContent } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Stations = () => {

    const [stationName, setStationName] = useState("");
    const [filterOption, setFilterOption] = useState(""); // Added filterOption state
    
    const handleStationNameChange = (event) => {
        setStationName(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value); // Handle filter option change
    };

    const handleSearch = () => {
        // Logic to search for stations based on the 'stationName' and 'filterOption'
        // Implement API calls or any other logic here.
        console.log("Searching for station:", stationName, "Filter by:", filterOption);
    };

    const stations = [
      {
          name: 'Maradana',
          location: '(6.926997, 79.863984)',
          sm: 'Kasun Silva',
          sm_contact: '077-1236547',
          phone: '011-4567412',
          trainLine: 'Main line'
      },
      {
          name: 'Colombo Fort',
          location: '(6.926997, 80.863984)',
          sm: 'Damith Perera',
          sm_contact: '077-1236547',
          phone: '011-4562389',
          trainLine: 'Main line'
      },
      {
        name: 'Kandy',
        location: '(6.926997, 79.863984)',
        sm: 'Nihal Soysa',
        sm_contact: '077-1236547',
        phone: '011-8527413',
        trainLine: 'Mathale line'
      },
      {
        name: 'Jaffna',
        location: '(6.926997, 80.863984)',
        sm: 'Sugathapala De Mel',
        sm_contact: '077-1236547',
        phone: '021-3579512',
        trainLine: 'Northern line'
      },
      {
        name: 'Rambukkana',
        location: '(6.926997, 80.863984)',
        sm: 'Nadeeka Subasinghe',
        sm_contact: '077-1236547',
        phone: '041-3579632',
        trainLine: 'Mathale line'
      },
      {
          name: 'Galle',
          location: '(6.926997, 80.863984)',
          sm: 'Kithsiri Mewan',
          sm_contact: '077-1236547',
          phone: '081-1239875',
          trainLine: 'Coastal line'
      },
      {
        name: 'Moratuwa',
        location: '(6.926997, 80.863984)',
        sm: 'Buwaneka Rodrigo',
        sm_contact: '077-1236547',
        phone: '045-6985321',
        trainLine: 'Coastal line'
      },
      {
        name: 'Kaluthara',
        location: '(6.926997, 80.863984)',
        sm: 'Ranga Gunathilaka',
        sm_contact: '077-1236547',
        phone: '012-7896543',
        trainLine: 'Coastal line'
      },
      {
        name: 'Trincomalee',
        location: '(6.926997, 80.863984)',
        sm: 'Murali Tharan',
        sm_contact: '077-1236547',
        phone: '045-7896932',
        trainLine: 'Trincomalee line'
      }
    ];

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
                              <Typography variant="h6" style={{flex: 1}}>{station.name}</Typography>
                              <Typography variant="h6" color="#3d51a9" style={{flex: 1}}>S2341</Typography>
                              </div>
                              
                              <Divider style={{ marginBottom: '20px' }} />

                              <div style={{ display: 'flex', marginTop: '15px' }}>
                                  <div style={{ flex: 1 }}>
                                      <Typography variant="subtitle1">Location:</Typography>
                                      <Typography variant="subtitle1">SM:</Typography>
                                      <Typography variant="subtitle1">SM Contact:</Typography>
                                      <Typography variant="subtitle1">Station Contact:</Typography>
                                      <Typography variant="subtitle1">Train Line:</Typography>
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
