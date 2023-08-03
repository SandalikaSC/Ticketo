import React from 'react';
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Card from '../../components/common/card';

const delaysList = ["Ruhuna-Coastal line","GaluKumari-Coastal line","Rajarata-main land"];

const Delays = () => {
    return (
        <Container>
            <Typography variant='h1' 
            sx={ {color: 'primary.main'}}>Train Delays</Typography>
            {/* <Typography variant='h2'>Overview</Typography> */}
            <Box
                sx={{
                    pt:4,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row"},
                    justifyContent: "space-between",
                    gap: 4,
                }}
            >
                {delaysList.map((service)=> (
                    <Paper elevation={3} sx={{ width: {xs: 1, md: 320}}}>
                        <Box sx={{m:3}}>
                            <Typography variant='h3'>{service}</Typography>
                            <Typography>
                            dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text 
                            ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book. 
                            </Typography>
                            <Button variant='contained' sx={{mt:2}}>
                            Learn More
                            </Button>
                        </Box>                        
                    </Paper>
                ))}

            </Box>
        </Container>
    );
};

export default Delays;