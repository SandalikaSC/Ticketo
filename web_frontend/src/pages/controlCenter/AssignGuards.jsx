import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const AssignGuards = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission
    };

    return (
        <Container maxWidth="md">
            <Typography variant='h1' 
            sx={ {color: 'primary.main'}}>Assign Train Guards</Typography>
            <br></br>
            {/* <Typography variant="h6" component="h1" gutterBottom>
                To sig
            </Typography> */}
            <form onSubmit={handleSubmit}>
                <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                />

                <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                />

                <TextField
                label="NIC"
                variant="outlined"
                fullWidth
                margin="normal"
                required    
                />

                <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                />


                <TextField
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                />

                <TextField
                label="Mobile No."
                variant="outlined"
                fullWidth
                margin="normal"
                required
                />

                <TextField
                label="Assigned Train"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                />

                <Button type="submit" variant="contained" color="primary">
                Submit
                </Button>
            </form>
        </Container>            
            
        
        
    );
};

export default AssignGuards;