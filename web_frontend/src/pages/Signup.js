import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () =>
{
    const history = useNavigate();
    console.log(history);
    const [inputs, setInputs] = useState({
        firstName: "",
        email: "",
        userType: "",
        password: ""
    });
    const sendRequest = async () =>
    {
        try
        {
            const res = await axios.post('http://localhost:5000/api/auth/signup', {
                firstName: inputs.firstName,
                email: inputs.email,
                userType: inputs.userType,
                password: inputs.password
            });

            const data = res.data;
            return data;
        } catch (err)
        {
            console.log(err);
            throw err; // Rethrow the error to handle it outside the function if needed
        }
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(inputs);
        //send http request
        sendRequest().then(() => history("/"));
    };
    const handleChange = (e) =>
    {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        // console.log(e.target.firstName, "value", e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="center"
                    alignItems='center'
                    width={300}
                    marginLeft="auto"
                    marginRight="auto"
                >
                    <Typography variant='h3'>Signup</Typography>
                    <TextField
                        name="firstName"
                        value={inputs.firstName}
                        variant='outlined'
                        placeholder='firstName'
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name='email'
                        onChange={handleChange}
                        type='email'
                        value={inputs.email}
                        variant='outlined'
                        placeholder='Email'
                        margin="normal"
                    />
                    <TextField
                        name='userType'
                        onChange={handleChange}
                        value={inputs.userType}
                        variant='outlined'
                        placeholder='userType'
                        margin="normal"
                    />
                    <TextField
                        name='password'
                        onChange={handleChange}
                        type='password'
                        value={inputs.password}
                        variant='outlined'
                        placeholder='Password'
                        margin="normal"
                    />
                    <Button variant='contained' type="submit">Signup</Button>
                </Box>
            </form>
        </div>
    )
}

export default Signup