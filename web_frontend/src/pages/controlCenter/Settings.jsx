import React from 'react';
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const Settings = () => {
    return (
        <Container>
            <Typography variant='h1' 
            sx={ {color: 'primary.main'}}>Account Settings</Typography>
            <br></br>
        </Container>
        
    );
};

export default Settings; 