// Import required modules and components from Material-UI and other packages
import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link, InputAdornment } from '@mui/material';
import LoginPageStyles from '../styles/LoginStyles'; // Import custom styles for this component
import { useNavigate } from "react-router-dom"; // Import hook for programmatic navigation
import axios from 'axios'; // Import axios for making HTTP requests
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux to dispatch actions
import { authActions } from '../store'; // Import authActions from the Redux store to handle authentication actions

const LoginPage = () =>
{
    // Initialize state variables using useState hook
    const dispatch = useDispatch(); // Get the dispatch function from react-redux
    const history = useNavigate(); // Get the navigate function from react-router-dom
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    // Function to send login request to the server
    const sendRequest = async () =>
    {
        try
        {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
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

    // Function to handle form submission
    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(inputs);
        // Send HTTP request to login the user and dispatch the login action
        sendRequest().then(() => dispatch(authActions.login())).then(() => history("/user"));
    };

    // Function to handle input changes and update state
    const handleChange = (e) =>
    {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    // Get the custom styles for this component
    const styles = LoginPageStyles;

    // Render the login page layout
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
                {/* Form for user login */}
                <form onSubmit={handleSubmit}>
                    <Box sx={styles.textFieldContainer}>
                        <Typography variant="h3" align="center" sx={styles.title}>
                            Login
                        </Typography>
                        {/* Input field for email */}
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
                        />

                        {/* Input field for password */}
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

                        {/* Button to submit the login form */}
                        <Button type='submit' variant="h1" color="primary" fullWidth sx={styles.loginButton}>
                            Login
                        </Button>

                        {/* Forgot password link */}
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
