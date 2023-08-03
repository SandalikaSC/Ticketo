import React, { useState } from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    FaSearch
  }from "react-icons/fa";

const TrainInfo = () => {
    const [trainName, setTrainName] = useState("");
  
    const handleTrainNameChange = (event) => {
      setTrainName(event.target.value);
    };

    const handleSearch = () => {
        // Logic to track trains based on the 'trainName'
        // Implement API calls or any other tracking logic here.
        console.log("Searching for train:", trainName);
      };

    return (
        <Container>
            <Typography variant='h1' 
            sx={ {color: 'primary.main'}}>Search Train Info</Typography>
            <br></br>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Train Name"
              variant="outlined"
              fullWidth
              value={trainName}
              onChange={handleTrainNameChange}
              style={{ marginRight: 16 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ height: "30px" }}>
              <FaSearch />
            </Button>
            </div>
        </Container>
        
    );
};

export default TrainInfo;