import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Box,
  Grid
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { display } from "@mui/system";
import '../../../css/cc_addTrainSchedule.css';

const AddTrainSchedule = () => {
  const [trainId, setTrainId] = useState("");
  const [trainName, setTrainName] = useState("");
  const [startingStation, setStartingStation] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [destination, setDestination] = useState("");
  const [finishingTime, setFinishingTime] = useState("");
  const [workingDays, setWorkingDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [stations, setStations] = useState([]);
  const [newStation, setNewStation] = useState({
    stationName: "",
    arrivalTime: "",
    waitingTime: "",
    departureTime: "",
  });

  const handleWorkingDaysChange = (day) => {
    setWorkingDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleAddStation = () => {
    setStations((prevStations) => [...prevStations, newStation]);
    setNewStation({
      stationName: "",
      arrivalTime: "",
      waitingTime: "",
      departureTime: "",
    });
  };

  const handleSave = () => {
    // Handle saving the data here
  };

  return (
    <Container maxWidth="xl" className="main-container">
      <div className="firstContainer">
        <Typography variant="h4" style={{color: '#3D50AC', flex: 4 }}>
            <b>Search Train to Add Schedule</b>
        </Typography>

        <div className="search-box">
          <TextField 
          fullWidth
          variant="outlined">

          </TextField>

          <Button
            variant="contained"
            color="primary"
            style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '50px', flex: 1 }}
          >
            <FaSearch />
          </Button>
        </div>        

      </div>

      <Divider style={{marginTop: '20px'}}/>      


      <div className="view-all-schdules">
        <Paper elevation={3} className="train-schedule-part">
          <h2>Samudra Devi</h2>

          <div style={{textAlign : "right"}}>
            <Link
                to={{
                    pathname: '/cc/resolve',
                    state: {
                        propKey1: notification.trainName,
                        propKey2: notification.number,
                    },
                }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '50px', flex: 1 }}
              >
                Add Schedule
              </Button>
            </Link>
          </div>          

        </Paper>

        <Paper elevation={3} className="train-schedule-part">
          <h2>Ruhunu Kumari</h2>

          <div style={{textAlign : "right"}}>
            <Button
              variant="contained"
              color="primary"
              style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '50px', flex: 1 }}
            >
              Add Schedule
            </Button>
          </div> 

        </Paper>

        <Paper elevation={3} className="train-schedule-part">
          <h2>Ella Express</h2>

          <div style={{textAlign : "right"}}>
            <Button
              variant="contained"
              color="primary"
              style={{ maxWidth: '90px', maxHeight: '90px', minWidth: '30px', minHeight: '50px', flex: 1 }}
            >
              Add Schedule
            </Button>
          </div> 

        </Paper>
      </div>
      

      {/* <Paper elevation={3} className="view-all-schdules">
        
        <Typography
            variant="h4"
            style={{ marginBottom: "10px", color: "#3D50AC" , marginTop: "1%"}}
            >
            <b>Add Train Schedule</b>
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Enter Train Code"
              fullWidth
              value={trainId}
              onChange={(e) => setTrainId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Enter Train Name"
              fullWidth
              value={trainName}
              onChange={(e) => setTrainName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Starting Station"
              fullWidth
              value={startingStation}
              onChange={(e) => setStartingStation(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Starting Time"
              fullWidth
              value={startingTime}
              onChange={(e) => setStartingTime(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Destination"
              fullWidth
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Finishing Time"
              fullWidth
              value={finishingTime}
              onChange={(e) => setFinishingTime(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="h5"
        style={{ marginBottom: "10px", color: "#3D50AC" , marginTop: "1%"}}
        >
          <b>Working Days</b>
        </Typography>
        <Box display="flex">
          {Object.keys(workingDays).map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={workingDays[day]}
                  onChange={() => handleWorkingDaysChange(day)}
                  color="primary"
                />
              }
              label={day.charAt(0).toUpperCase() + day.slice(1)}
            />
          ))}
        </Box>

        {stations.map((station, index) => (
          <div key={index} style={{ marginTop: "20px" }}>
            <Typography variant="subtitle1" style={{color: "#3D50AC"}}><b>Station {index + 1}</b></Typography>

            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <TextField
                label="Station Name"
                value={station.stationName}
                fullWidth
                style={{marginRight: "20px" }}
                disabled
                />
                <TextField
                label="Arrival Time"
                value={station.arrivalTime}
                fullWidth
                style={{marginRight: "20px" }}
                disabled
                />
                <TextField
                label="Waiting Time"
                value={station.waitingTime}
                fullWidth
                style={{marginRight: "20px" }}
                disabled
                />
                <TextField
                label="Departure Time"
                value={station.departureTime}
                fullWidth
                style={{marginRight: "20px" }}
                disabled
                />

                <Button
                variant="contained"
                color="primary"
                >
                Discard
                </Button>
            </div>
            
          </div>
        ))}

        <Button
        variant="contained"
        color="primary"
        onClick={handleAddStation}
        style={{ marginTop: "20px" }}
        >
        Add Station
        </Button>

        <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: "20px", marginLeft: "20px" }}
        >
        Save
        </Button>
      </Paper> */}
    </Container>
  );
};

export default AddTrainSchedule;
