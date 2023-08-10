import React from 'react';
import { Container, Typography, Divider, Paper, Select, MenuItem } from '@mui/material';

const TrainDelays = () => {
    const notifications = [
        { trainName: 'Samudra Devi', number: 'T1234', destination: 'Katugoda', currentLocation: 'Colombo', arrival: '7.00AM', delay: '2' },
        { trainName: 'Galu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Ruhunu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Rajarata Rajini', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Sagarika', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },        
    ];

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        // Handle sort change here
        console.log('Selected sort:', selectedValue);
    };

    return (
        <Container style={{ padding: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '10px', color: '#3D50AC' }}>
                <b>Train Delays</b>
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Typography variant="outlined" style={{ marginBottom: '10px', color: '#3D50AC' }}>
                    <b>Sort Delays by</b>
                </Typography>
                &nbsp;
                <Select value="" onChange={handleSortChange}>
                    <MenuItem value="older">Older</MenuItem>
                    <MenuItem value="latest">Latest</MenuItem>
                </Select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notifications.map((notification, index) => (
                    <Paper key={index} elevation={3} style={{ display: 'flex', marginBottom: '10px', borderRadius: '10px' }}>
                        {/* First Column (3 rows) */}
                        <div style={{ flex: 2, padding: '10px', borderRight: '1px solid #ccc' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    {notification.trainName}
                                </Typography>
                                <Typography variant="h5" style={{ fontWeight: 'bold', color: '#3D50AC' }}>
                                    {notification.number}
                                </Typography>
                            </div>
                        </div>

                        {/* Second Column (3 rows) */}
                        <div style={{ flex: 3, padding: '10px', borderRight: '1px solid #ccc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                                    <Typography variant="body1" color="textSecondary" style={{flex: 1}}>
                                        <b>Destination :</b>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" style={{flex: 1}}>
                                        {notification.destination}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                                    <Typography variant="body1" color="textSecondary" style={{flex: 1}}>
                                        <b>Current location :</b>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" style={{flex: 1}}>
                                        {notification.currentLocation}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                                    <Typography variant="body1" color="textSecondary" style={{flex: 1}}>
                                        <b>Arrival :</b>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" style={{flex: 1}}>
                                        {notification.arrival} ({notification.delay} minute delay)
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

export default TrainDelays;
