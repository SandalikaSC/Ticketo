import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  Grid
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { display } from "@mui/system";
import '../../../css/cc_addTrainSchedule.css';
import { Link } from 'react-router-dom';

const AddTrainSchedule = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/alltrains");
      setTrains(response.data.trains);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
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
            onClick={fetchTrains}
          >
            <FaSearch />
          </Button>
        </div>        

      </div>

      <Divider style={{marginTop: '20px'}}/> <br></br>  

      <div className="view-all-schdules">
        {trains.map((train,index) => (
          <Paper elevation={3} className="train-schedule-part" key={index}>
            <h2>{train.trainName}</h2>

            <div style={{textAlign : "right"}}>
              <Link
                  to={{
                      pathname: '/cc/addschedule',
                      state: {
                          propKey1: train.trainName,
                          propKey2: train.trainId,
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
        ))}
        
      </div>
      
      <br></br>
      <br></br>
      
    </Container>
  );
};

export default AddTrainSchedule;
