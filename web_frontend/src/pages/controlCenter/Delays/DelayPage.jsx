import React, { useState } from 'react';
import { Container, Typography, Divider, Paper, Button } from '@mui/material';
import Drawer from '../../../components/controlCenter/Drawer';
import TrainInfo from '../../../components/controlCenter/TrainInfo';
import MapContainer from '../../../components/controlCenter/MapContainer';

const DelayPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>

            <div style={{ flex: 1 }}>
                <MapContainer /> 
            </div>

            {/* Drawer */}
            <Drawer isOpen={isDrawerOpen}>
                <TrainInfo />
            </Drawer>

            {/* Toggle button */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: isDrawerOpen ? '30%' : 0, // Adjust the value based on the drawer width
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

export default DelayPage;
