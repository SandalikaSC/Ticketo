import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";
axios.defaults.withCredentials = true;

let firstRender = true;

const Welcome = () =>
{
    const [user, setUser] = useState();

    const sendRequest = async () =>
    {
        try
        {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken)
            {
                throw new Error('Access token not found in local storage');
            }
            const res = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Include the JWT token in the Authorization header
                },
            });
            const data = await res.data;

            console.log('Response data:', data); // Log the response data for debugging

            if (data && data.user)
            {
                return data;
            } else
            {
                throw new Error('Invalid response data');
            }
        } catch (error)
        {
            console.log(error);
            // Handle the error or return an appropriate value
        }
    };


    useEffect(() =>
    {
        if (firstRender)
        {
            firstRender = false;
            sendRequest().then((data) =>
            {
                if (data && data.user)
                {
                    setUser(data.user);
                }
            });
        }
    }, []);


    return <div>
        <header>
            <Header />
        </header>
        {user && <h1>Welome {user.email}. Your userType is {user.userType}</h1>}
        hiiii
    </div>;
};

export default Welcome;
