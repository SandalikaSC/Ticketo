import React, { useState } from 'react'
import { AppBar, Tabs, Toolbar, Box, Tab, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';

axios.default.withCredentials = true;
const Header = () =>
{
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const sendLogoutReq = async () =>
    {
        const res = await axios.post("http://localhost:5000/api/auth/logout", null, {
            withCredentials: true
        });
        if (res.status === 200)
        {
            return res;
        }
        return new Error("Unable to logout. Please try again");
    }

    const handleLogout = () =>
    {
        sendLogoutReq().then(() => dispatch(authActions.logout()));
    }
    const [value, setValue] = useState();
    return (
        <div>
            <AppBar position="sticky" sx={{ backgroundColor: '#FFFFFF', boxShadow: '0px -2px 4px rgba(0,0,0,9)' }}>
                <Toolbar>
                    <img src="/images/logo1.png" alt="Logo" style={{ marginRight: '10px', width: '60px', height: '60px' }} />
                    <Typography variant="h5" sx={{ color: '#3D50AC', fontWeight: 'bold' }}>Ticketo</Typography>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Tabs
                            indicatorColor='secondary'
                            onChange={(e, val) => setValue(val)}
                            value={value}
                            textColor="inherit"
                            sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#F86F5D",
                                },
                            }}
                        >
                            {
                                !isLoggedIn && <>
                                    <Tab to="/login" LinkComponent={Link} label="Login" sx={{ color: '#3D50AC', fontWeight: 'bold' }} />
                                    <Tab to="/signup" LinkComponent={Link} label="Signup" sx={{ color: '#3D50AC', fontWeight: 'bold' }} /></>
                            }
                            {
                                isLoggedIn && (
                                    <Tab onClick={handleLogout} to="/" LinkComponent={Link} label="Logout" sx={{ color: '#3D50AC', fontWeight: 'bold' }} />
                                )}{" "}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div >
    );
};

export default Header;