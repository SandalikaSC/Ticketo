import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";
axios.defaults.withCredentials = true;

let firstRender = true;

const Welcome = () =>
{
    const [user, setUser] = useState();

    const refreshToken = async () =>
    {
        try
        {
            const res = await axios.get("http://localhost:5000/api/auth/refresh", {
                withCredentials: true,
            });
            const data = res.data;
            return data;
        } catch (err)
        {
            console.log(err);
            throw err; // Rethrow the error to handle it outside the function if needed
        }
    };


    const sendRequest = async () =>
    {
        try
        {
            const res = await axios.get('http://localhost:5000/api/auth/user', {
                withCredentials: true,
            });
            const data = await res.data;

            console.log('Response data:', data); // Log the response data for debugging

            if (data && data.user && data.user.name)
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
        let interval = setInterval(() =>
        {
            refreshToken().then(data => setUser(data.user));
        }, 1000 * 28);


        return () => clearInterval(interval);

    }, []);


    return <div>
        <header>
            <Header />
        </header>
        {user && <h1>Welome {user.email}</h1>}
        hiiii
    </div>;
};

export default Welcome;
