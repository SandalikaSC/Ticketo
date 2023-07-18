import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link, InputAdornment } from '@mui/material';
import LoginPageStyles from '../styles/LoginStyles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const LoginPage = () =>
{
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const sendRequest = async () =>
    {
        try
        {
            const res = await axios.post('http://localhost:5000/api/login', {
                // name: inputs.name,
                email: inputs.email,
                password: inputs.password
            });

            const data = res.data;
            return data;
        } catch (error)
        {
            console.log(error);
            // Handle the error or return an appropriate value
        }
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(inputs);
        //send http request
        sendRequest().then(() => dispatch(authActions.login())).then(() => history("/user"));
    };
    const handleChange = (e) =>
    {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        // console.log(e.target.name, "value", e.target.value)
    }
    const styles = LoginPageStyles;

    return (
        <Grid container spacing={0} style={styles.container}>
            {/* First Column */}
            <Grid item sx={styles.firstColumn} />

            {/* Second Column */}
            <Grid item xs={5} sx={styles.secondColumn}>
                <Box>
                    <img src="images/logo.png" alt="logo" style={styles.logo} />
                    <Typography variant="h5" align="center" sx={styles.slogan}>
                        Where your train adventure begins
                    </Typography>
                </Box>
            </Grid>

            {/* Vertical Line */}
            <Grid item xs={1} sx={styles.verticalLine}>
                <div style={styles.line}></div>
            </Grid>

            {/* Third Column */}
            <Grid item xs={5} sx={styles.thirdColumn}>
                <form onSubmit={handleSubmit}>

                    <Box sx={styles.textFieldContainer}>
                        <Typography variant="h3" align="center" sx={styles.title}>
                            Login
                        </Typography>
                        <TextField
                            placeholder="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src="images/usericon.png" alt="User Icon" style={styles.icon} />
                                    </InputAdornment>
                                ),
                                autocomplete: 'off', // Disable autofill
                            }}
                            sx={styles.textField}
                        // className="custom-textfield"
                        />
                        <TextField
                            name='password'
                            onChange={handleChange}
                            value={inputs.password}
                            placeholder="Password"
                            fullWidth
                            margin="normal"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src="images/passwordicon.png" alt="User Icon" style={styles.icon} />
                                    </InputAdornment>
                                ),
                                autocomplete: 'off', // Disable autofill
                            }}
                            sx={styles.textField}
                        />
                        <Button type='submit' variant="h1" color="primary" fullWidth sx={styles.loginButton}>
                            Login
                        </Button>
                        <Box sx={styles.forgotPassword}>
                            <Typography sx={styles.forgotPasswordText}>Forgot Password?</Typography>
                            <Link href="#" color="textSecondary" sx={styles.recoverLink}>
                                Recover Here
                            </Link>
                        </Box>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
