import React, { useState } from "react";
import {
  MenuItem,
  Divider,
  Typography,
  Button,
  Container,
} from "@mui/material";

import TrainIcon from "@mui/icons-material/Train";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControl, InputLabel, Select } from "@mui/material";
import ccBackgroundImage from "../../assets/cc_bg2.png";
import StationCard from "../../components/controlCenter/StationCard";
import "../../css/stationCard.css";
import { Link } from "react-router-dom";

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
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const scheduleData = [
    { trainName: "Samudra Devi", departure: "9:00 AM", arrival: "11:00 AM" },
    { trainName: "Sagarika", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Ruhunu Kumari", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Galu Kumari", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Podi Manike", departure: "9:00 AM", arrival: "11:00 AM" },
    { trainName: "Ella Odyssey", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Rajarata Rajina", departure: "11:30 AM", arrival: "1:30 PM" },
    { trainName: "Samudra Devi", departure: "11:30 AM", arrival: "1:30 PM" },
  ];

  const handleScheduleClick = (index) => {
    setSelectedSchedule(scheduleData[index]);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: "#ECECEC" }}>
          <Typography
            variant="h4"
            style={{ marginBottom: "10px", color: "#3D50AC", marginTop: "2%" }}
          >
            <b>Train Information Dashboard</b>
          </Typography>

          <Divider style={{ marginBottom: "20px" }} />

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
                    component={Link}
                    to="/cc/traininfo/add-train-schedule"
                  >
                    Add Train Schedule
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "30%", margin: "2%", marginTop: "3%" }}
                    component={Link}
                    to="/cc/traininfo/add-train"
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
                          <MenuItem value="train1">Samudra Devi</MenuItem>
                          <MenuItem value="train2">Galu Kumari</MenuItem>
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
                          <MenuItem value="station1">Galle</MenuItem>
                          <MenuItem value="station2">Colombo Fort</MenuItem>
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
                          <MenuItem value="stationA">Maradana</MenuItem>
                          <MenuItem value="stationB">Beliaththa</MenuItem>
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
                </div>

                <h2 style={{ color: "#3D51A9", marginBottom: "10px" }}>
                  Train Schedules
                </h2>
                <div style={{ maxHeight: "42vh", overflow: "auto" }}>
                  {scheduleData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleScheduleClick(index)}
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
                        <div style={{ fontWeight: "bold" }}>
                          {item.trainName}
                        </div>
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

            <div
              style={{
                flex: 1,
                width: "90%",
                marginTop: "2%",
                marginBottom: "3%",
                marginLeft: "18%",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {selectedSchedule ? (
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "4% ",
                    height: "94%",
                  }}
                >
                  <h2>Samudra Devi</h2>
                  <hr></hr>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "3%",
                      gap: "40%",
                      textAlign: "center",
                      paddingLeft: "13%",
                    }}
                  >
                    <h3>Start At</h3>
                    <h3>End At</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "3%",
                      gap: "40%",
                      textAlign: "center",
                      paddingLeft: "12%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <h3 style={{ color: "#3D51A9" }}>Galle</h3>
                      <h4 style={{ color: "#FA6F5D" }}>8.00 a.m</h4>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <h3 style={{ color: "#3D51A9" }}>Colombo</h3>
                      <h4 style={{ color: "#FA6F5D" }}>11.00 a.m</h4>
                    </div>
                  </div>
                  <h3
                    style={{
                      textAlign: "left",
                      marginTop: "4%",
                      marginBottom: "3%",
                      color: "#3D51A9",
                    }}
                  >
                    Stop Stations
                  </h3>

                  <div class="schedule-topic">
                    <h5>Station Name</h5>
                    <h5 style={{ marginLeft: "22%" }}>Arrival</h5>
                    <h5 style={{ marginRight: "5%" }}>Departure</h5>
                  </div>
                  <div style={{ height: "350px", overflow: "auto" }}>
                    <StationCard
                      stationName="Galle"
                      arrivalTime="08:00 AM"
                      departureTime="08:15 AM"
                    />
                    <StationCard
                      stationName="Hikkaduwa"
                      arrivalTime="09:00 AM"
                      departureTime="09:15 AM"
                    />
                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Ambalangoda"
                      arrivalTime="09:00 AM"
                      departureTime="09:15 AM"
                    />
                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Kaluthara"
                      arrivalTime="09:00 AM"
                      departureTime="09:15 AM"
                    />
                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Moratuwa"
                      arrivalTime="09:00 AM"
                      departureTime="09:15 AM"
                    />

                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Panadura"
                      arrivalTime="10:30 AM"
                      departureTime="10:45 AM"
                    />
                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Dehiwala"
                      arrivalTime="10:30 AM"
                      departureTime="10:45 AM"
                    />
                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Mount Lavinia"
                      arrivalTime="10:30 AM"
                      departureTime="10:45 AM"
                    />
                    <StationCard
                      stationIcon="path/to/your/icon.png"
                      stationName="Kollupitiya"
                      arrivalTime="10:30 AM"
                      departureTime="10:45 AM"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={ccBackgroundImage}
                  alt="Illustration"
                  style={{
                    width: "120%",
                    height: "100%",
                    marginTop: "2%",
                  }}
                />
              )}
            </div>
          </Grid>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default TrainInfo;
