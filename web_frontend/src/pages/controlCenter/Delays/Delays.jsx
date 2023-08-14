import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Select, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Delays = () => {
    const notifications = [
        { trainName: 'Samdra Devi', number: 'T1234', destination: 'Katugoda', currentLocation: 'Colombo', arrival: '7.00AM', delay: '2' },
        { trainName: 'Galu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Ruhunu Kumari', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Rajarata Rajini', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Ella Express', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },
        { trainName: 'Sagarika', number: 'T4532', destination: 'Colombo', currentLocation: 'Galle', arrival: '8.30AM', delay: '10' },   
    ];

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        // Handle sort change here
        console.log('Selected sort:', selectedValue);
    };

    const [redirectToResolve, setRedirectToResolve] = useState(false);

    const handleResolveClick = () => {
        // Perform any necessary actions here
        setRedirectToResolve(true);
    };

    return (
        <Container style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" style={{ marginBottom: '10px', color: '#3D50AC' }}>
                    <b>Train Delays</b>
                </Typography>
                <Divider style={{ marginBottom: '20px' }} />

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ flex: 1, fontWeight: 'bold' }}>
                            To be Resolved
                        </Button>
                        <Button variant="outlined" color="primary" style={{ flex: 1, fontWeight: 'bold' }}>
                            Already Resolved
                        </Button>
                        <Link to="/cc/delayreports" style={{ textDecoration: 'none', flex: 1 }}>
                            <Button variant="outlined" color="primary" style={{ width: '100%', fontWeight: 'bold' , height: '100%' }}>
                                Reports
                            </Button>
                        </Link>
                    </div>
                    <div style={{ flex: 3 }}></div>
                    <div style={{ flex: 2 }}>
                        {/* <div style={{ display: 'flex' }}>
                            <Typography variant="outlined" style={{ marginBottom: '10px', color: '#3D50AC' }}>
                                <b>Sort Delays by</b>
                            </Typography>
                            &nbsp;
                            <Select value="" onChange={handleSortChange} fullWidth>
                                <MenuItem value="older">Older</MenuItem>
                                <MenuItem value="latest">Latest</MenuItem>
                            </Select>
                        </div> */}

                        <Typography variant="outlined" style={{ marginBottom: '10px', color: '#3D50AC' }}>
                            <b>Sort Delays by</b>
                        </Typography>

                        <Select value="" onChange={handleSortChange} fullWidth>
                            <MenuItem value="older">Older</MenuItem>
                            <MenuItem value="latest">Latest</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notifications.map((notification, index) => (
                    <Paper key={index} elevation={3} style={{ display: 'flex', marginBottom: '10px', borderRadius: '10px' }}>
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

                        <div style={{ flex: 3, padding: '10px', borderRight: '1px solid #ccc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                                    <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                                        <b>Destination :</b>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                                        {notification.destination}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                                    <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                                        <b>Current location :</b>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                                        {notification.currentLocation}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
                                    <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                                        <b>Arrival :</b>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" style={{ flex: 1 }}>
                                        {notification.arrival} ({notification.delay} minute delay)
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link
                                to={{
                                    pathname: '/cc/resolve',
                                    state: {
                                        propKey1: notification.trainName,
                                        propKey2: notification.number,
                                    },
                                }}
                            >
                                <Button variant="contained" color="primary" size="small">
                                    Resolve
                                </Button>
                            </Link>
                        </div>
                    </Paper>
                ))}
            </div>
        </Container>
    );
};

export default Delays;
