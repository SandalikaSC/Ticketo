import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import {
    FaSearch
  }from "react-icons/fa";

// const Stations = () => {
//     return (
//         <Container>
//             <div>
//             <h1>Stations page</h1>
//             </div>
//         </Container>
        
//     );
// };

const Stations = () => {
    const [stationName, setStationName] = useState("");
  
    // const handleTrainNameChange = (event) => {
    //     setStationName(event.target.value);
    // };

    const handleSearch = () => {
        // Logic to track trains based on the 'trainName'
        // Implement API calls or any other tracking logic here.
        console.log("Searching for station:", stationName);
      };

    return (
        <Container>
            <Typography variant='h1' 
            sx={ {color: 'primary.main'}}>Search Station Info</Typography>
            <br></br>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Station Name"
              variant="outlined"
              fullWidth
              value={stationName}
              style={{ marginRight: 16 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ height: "30px" }}>
              <FaSearch />
            </Button>
            </div>
        </Container>
        
    );
};

export default Stations;