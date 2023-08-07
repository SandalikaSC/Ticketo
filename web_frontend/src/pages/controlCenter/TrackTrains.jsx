import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import {
    FaSearch
  }from "react-icons/fa";

const TrackTrains = () => {
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
            sx={ {color: 'primary.main'}}>Track Trains</Typography>
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
          {/* Replace the Map*/}
          <div
            style={{
              width: "100%",
              height: 400,
              backgroundColor: "#f0f0f0",
              marginTop: 16,
            }}
          >
            The train is shown here on map
          </div>
        </Container>
      );
    };


// const TrackTrains = () => {
//     return (
//         <Container>
//             <div>
//             <h1>Track trains page</h1>
//             </div>
//         </Container>
        
//     );
// };

export default TrackTrains;