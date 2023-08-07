import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoginPageStyles from '../styles/LoginStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const LoginPage = () =>
{
    const dispatch = useDispatch();
    const history = useNavigate(); 
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const sendRequest = async () =>
    {
        try
        {
            const res = await axios.post('http://localhost:5000/api/login', {
                email: inputs.email,
                password: inputs.password,
            });

            // Request was successful, clear any previous login error
            setLoginError('');

            const data = res.data;
            console.log(data);
            return data;
        } catch (error)
        {
            // Handle the login error and set the error message state variable
            setLoginError('Invalid credentials');
        }
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            const data = await sendRequest();
            if (data === null)
            {
                console.log('there is an error in API request');
                // There was an error in the API request, so do not proceed further
                return;
            }
            const { accessToken, userType } = data;

            localStorage.setItem('accessToken', accessToken);
            dispatch(authActions.login());

            // history("/user");
            if (userType[0] === 'ADMIN')
            {
                history('/admin');
            } else if (userType[0] === 'CONTROL_CENTRE')
            {
                history('/cc');
            } else if (userType[0] === 'STATION_MASTER')
            {
                history('/ss');
            } else if (userType[0] === 'TICKET_CLERK')
            {
                history('/tc');
            } else
            {
                console.log('Unknown userType:', userType);
            }
        } catch (err)
        {
            console.log(err);
        }
    };

    const handleChange = (e) =>
    {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePasswordToggle = () =>
    {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const styles = LoginPageStyles;

    return (
        <Grid container spacing={0} style={styles.container}>
            <Grid item xs={5} sx={styles.secondColumn}>
                <Box>
                    <img src="images/logo.png" alt="logo" style={styles.logo} />
                    <Typography variant="h5" align="center" sx={styles.slogan}>
                        Where your train adventure begins
                    </Typography>
                </Box>
            </Grid>
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
                                autoComplete: 'off',
                            }}
                            sx={styles.textField}
                        />
                        <TextField
                            name="password"
                            onChange={handleChange}
                            value={inputs.password}
                            placeholder="Password"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src="images/passwordicon.png" alt="User Icon" style={styles.icon} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handlePasswordToggle} edge="end">
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                autoComplete: 'off',
                            }}
                            sx={styles.textField}
                        />
                        <Button type="submit" variant="h1" color="primary" fullWidth sx={styles.loginButton}>
                            Login
                        </Button>
                        {loginError && <Box sx={{ ...styles.errorMessage, color: 'red' }}>{loginError}</Box>}
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
