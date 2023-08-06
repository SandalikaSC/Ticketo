import React from "react";
// import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TrainIcon from "@mui/icons-material/Train";
//import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Grid";
// import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControl, InputLabel, Select } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D51A9",
    },
    secondary: {
      main: "#FA6F5D",
    },
    background: {
      default: "#ECECEC",
    },
  },
});

const TrainInfo = () => {
  // const [numberOfCoaches, setNumberOfCoaches] = useState(1);

  const scheduleData = [
    { trainName: "Train A", departure: "9:00 AM", arrival: "11:00 AM" },
    { trainName: "Train B", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Train B", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Train B", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Train A", departure: "9:00 AM", arrival: "11:00 AM" },
    { trainName: "Train B", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Train B", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Train B", departure: "11:30 AM", arrival: "1:30 PM" },
    // Add more schedule items here
  ];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#ECECEC" }}>
        <div
          style={{
            backgroundColor: "white",
            color: "#FA6F5D",
            padding: "5px",
            textAlign: "center",
          }}
        >
          <h1>Train Information Dashboard</h1>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div
              style={{
                backgroundColor: "white",
                padding: "5%",
                paddingTop: "3%",
                width: "120%",
                marginTop: "3%",
                marginBottom: "3%",
                marginLeft: "26px",
                borderRadius: "20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                  Train Schedule Dashboard
                </h2>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "30%", margin: "2%", marginTop: "3%" }}
                >
                  Add Train Schedule
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "30%", margin: "2%", marginTop: "3%" }}
                >
                  Add Train
                </Button>
              </div>
              <div
                style={{
                  backgroundColor: "#ECECEC",
                  padding: "10px",
                  display: "flex",
                  maxWidth: "100%",
                  gap: "3%",
                  alignItems: "center",
                }}
              >
                {/* First Column: Filter Options */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    paddingLeft: "2%",
                    paddingRight: "2%",
                    borderRadius: "30px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "10px",
                      gap: "3%",
                    }}
                  >
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="filterTrainName">
                        Select Train
                      </InputLabel>
                      <Select
                        label="Select Train"
                        inputProps={{
                          name: "filterTrainName",
                          id: "filterTrainName",
                        }}
                      >
                        {/* Add your train options here */}
                        <MenuItem value="train1">Train 1</MenuItem>
                        <MenuItem value="train2">Train 2</MenuItem>
                        {/* Add more options as needed */}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="filterStartStation">
                        Start Station
                      </InputLabel>
                      <Select
                        label="Select Start Station"
                        inputProps={{
                          name: "filterStartStation",
                          id: "filterStartStation",
                        }}
                      >
                        {/* Add your start station options here */}
                        <MenuItem value="station1">Station 1</MenuItem>
                        <MenuItem value="station2">Station 2</MenuItem>
                        {/* Add more options as needed */}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="filterEndStation">
                        End Station
                      </InputLabel>
                      <Select
                        label="Select End Station"
                        inputProps={{
                          name: "filterEndStation",
                          id: "filterEndStation",
                        }}
                      >
                        {/* Add your end station options here */}
                        <MenuItem value="stationA">Station A</MenuItem>
                        <MenuItem value="stationB">Station B</MenuItem>
                        {/* Add more options as needed */}
                      </Select>
                    </FormControl>

                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "40%", margin: "2%", marginTop: "3%" }}
                    >
                      Filter
                    </Button>
                  </div>
                </div>
                {/* Second Column: Add Train Schedule */}
              </div>

              <h2 style={{ color: "#3D51A9", marginBottom: "10px" }}>
                Train Schedules
              </h2>
              <div style={{ maxHeight: "42vh", overflow: "auto" }}>
                {scheduleData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "4px",
                      marginRight: "26px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ECECEC",
                    }}
                  >
                    {/* First Column - Train Icon */}
                    <div style={{ marginRight: "10px", textAlign: "center" }}>
                      <TrainIcon />
                    </div>

                    {/* Second Column - Train Name and Working Days */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold" }}>{item.trainName}</div>
                      <div style={{ color: "grey" }}>
                        Monday, Friday, Sunday Only
                      </div>
                    </div>

                    {/* Third Column - Departure and Arrival */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#3D51A9", fontWeight: "bold" }}>
                        8.00 a.m - 11.00 a.m
                      </div>

                      <div style={{ color: "grey" }}>Galle - Colombo</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default TrainInfo;
