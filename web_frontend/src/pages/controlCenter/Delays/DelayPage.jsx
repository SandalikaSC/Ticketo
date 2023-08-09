import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const DelayPage = () => {
    const location = useLocation();
    const propValue1 = location.state?.propKey1; // Access the first passed prop
    const propValue2 = location.state?.propKey2; // Access the second passed prop

    return(
        <Container style={{ padding: '20px' }}>
            <Typography variant="h2" style={{ marginBottom: '10px', color: '#3D50AC' }}>
            Well {propValue1}
            </Typography>
        </Container>        
    );
};

export default DelayPage;