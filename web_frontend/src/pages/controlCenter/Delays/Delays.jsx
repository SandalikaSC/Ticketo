import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Divider,
  Paper,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../../../css/cc_addTrainSchedule.css";
import axios from "axios";

const Delays = () => {
  const [notifications, setNotifications] = useState([]);
  //   const notifications = [
  //     {
  //       trainName: "Samdra Devi",
  //       number: "T1234",
  //       destination: "Katugoda",
  //       currentLocation: "Colombo",
  //       arrival: "7.00AM",
  //       delay: "2",
  //     },
  //     {
  //       trainName: "Galu Kumari",
  //       number: "T4532",
  //       destination: "Colombo",
  //       currentLocation: "Galle",
  //       arrival: "8.30AM",
  //       delay: "1",
  //     },
  //     {
  //       trainName: "Ruhunu Kumari",
  //       number: "T1242",
  //       destination: "Hambantota",
  //       currentLocation: "Matara",
  //       arrival: "8.40AM",
  //       delay: "4",
  //     },
  //     {
  //       trainName: "Rajarata Rajini",
  //       number: "T7892",
  //       destination: "Kandy",
  //       currentLocation: "Rambukkana",
  //       arrival: "8.50AM",
  //       delay: "12",
  //     },
  //     {
  //       trainName: "Ella Express",
  //       number: "T3574",
  //       destination: "Ella",
  //       currentLocation: "Kandy",
  //       arrival: "9.02AM",
  //       delay: "18",
  //     },
  //     {
  //       trainName: "Sagarika",
  //       number: "T9512",
  //       destination: "Maradana",
  //       currentLocation: "Kaluthara",
  //       arrival: "9.03AM",
  //       delay: "25",
  //     },
  //   ];

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-delays");
      //console.log(response.data);

      setNotifications(response.data.notifications); // Update the state with the response data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("hihihih");
  console.log(notifications);
  // Use the useEffect hook to fetch data every 5 seconds
  useEffect(() => {
    // Initial fetch when the component mounts
    fetchData();

    // Set up an interval to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  //   const handleSortChange = (event) => {
  //     const selectedValue = event.target.value;
  //     // Handle sort change here
  //     console.log("Selected sort:", selectedValue);
  //   };

  //   const [redirectToResolve, setRedirectToResolve] = useState(false);

  //   const handleResolveClick = () => {
  //     // Perform any necessary actions here
  //     setRedirectToResolve(true);
  //   };

  return (
    <Container style={{ padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          style={{ marginBottom: "10px", color: "#3D50AC" }}
        >
          <b>Train Delays</b>
        </Typography>
        <Divider style={{ marginBottom: "20px" }} />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <Link to="/cc/delays" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              style={{
                flex: 1,
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                color: "white",
              }}
              fullWidth
            >
              To be Resolved
            </Button>
          </Link>

          <Link
            to="/cc/alreadyresolveddelays"
            style={{ textDecoration: "none", flex: 1 }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{
                flex: 1,
                fontWeight: "bold",
              }}
              fullWidth
            >
              Already Resolved
            </Button>
          </Link>

          <div style={{ flex: 3 }}></div>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            style={{ marginRight: 10, height: "100%", flex: 2 }}
          >
            <InputLabel htmlFor="filterDelays">Filter Delays</InputLabel>
            <Select
              label="Filter by"
              inputProps={{
                name: "filterDelays",
                id: "filterDelays",
              }}
            >
              <MenuItem value="Today">Older</MenuItem>
              <MenuItem value="Yesterday">Latest</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            // onClick={handleShowReports}
            style={{
              maxHeight: "50px",
              minWidth: "30px",
              minHeight: "50px",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            Sort
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {Array.isArray(notifications) &&
          notifications.map((notification, index) => (
            <Paper
              key={index}
              elevation={3}
              style={{
                display: "flex",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  flex: 2,
                  padding: "10px",
                  borderRight: "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {notification.trainName}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", color: "#3D50AC" }}
                  >
                    {notification.number}
                  </Typography>
                </div>
              </div>

              <div
                style={{
                  flex: 3,
                  padding: "10px",
                  borderRight: "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ flex: 1 }}
                    >
                      <b>Destination :</b>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ flex: 1 }}
                    >
                      {notification.destination}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ flex: 1 }}
                    >
                      <b>Current location :</b>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ flex: 1 }}
                    >
                      {notification.currentLocation}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ flex: 1 }}
                    >
                      <b>Arrival :</b>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ flex: 1 }}
                    >
                      {notification.arrival} ({notification.delay} minute delay)
                    </Typography>
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link
                  to={{
                    pathname: "/cc/resolve",
                    state: {
                      propKey1: notification.trainName,
                      propKey2: notification.number,
                    },
                  }}
                >
                  <Button variant="contained" color="primary" size="small">
                    Resolve
                  </Button>
                </Link>
              </div>
            </Paper>
          ))}
      </div>
    </Container>
  );
};

export default Delays;
