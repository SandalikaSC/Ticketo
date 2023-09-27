import React, { useState } from "react";
import { Paper,
    Typography,
    Container,
    Grid,
    TextField,
    Divider,
    Button,
    Box,
    Checkbox,
    FormControlLabel
 } from "@mui/material";
import '../../css/cc_addTrainSchedule.css';
import { Repeat } from "@mui/icons-material";

const AddSchedule = () =>{

    const [errors, setErrors] = useState({});

    const initialStations = [
        {
          stationName: "",
          arrivalTime: "",
          waitingTime: "",
          departureTime: "",
        },
        {
          stationName: "",
          arrivalTime: "",
          waitingTime: "",
          departureTime: "",
        },
        {
            stationName: "",
            arrivalTime: "",
            waitingTime: "",
            departureTime: "",
          },
          {
            stationName: "",
            arrivalTime: "",
            waitingTime: "",
            departureTime: "",
          }
        
      ];

    const [formData, setFormData] = useState({
        startingStation: " ",
        startingTime: "",
        destination: "",
        finishingTime: "",
        workingDays: [],
        middleStations: initialStations,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("Name:", name);
        console.log("Value:", value);

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: undefined,
        });
    };

    const [workingDays, setWorkingDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });

    const [stations, setStations] = useState([]);

    const validateForm = () => {
        
        const newErrors = {};
    
        if (!formData.startingStation) {
            console.log("startingStation start");
          newErrors.startingStation = "Starting station is required";
        }
    
        if (!formData.startingTime) {
          console.log("startingTime start");
          newErrors.startingTime = "Starting time is required";
        }
    
        if (!formData.destination) {
            console.log("destination start");
          newErrors.destination = "Destination is required";
        }

        if (!formData.finishingTime) {
            console.log("finishingTime start");
            newErrors.finishingTime = "Finishing time is required";
          }

        if (formData.workingDays.length===0) {
            console.log(formData.workingDays);
            newErrors.workingDays = "Working days are required";
        }

        if (formData.middleStations.length===0) {
            console.log(formData.middleStations);
            newErrors.middleStations = "Required to enter middle stations";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if there are no errors
      };

    const handleWorkingDaysChange = (day) => {
        setWorkingDays((prevDays) => ({
          ...prevDays,
          [day]: !prevDays[day],
        }));

        // Update formData.workingDays here
        const selectedDays = Object.keys(workingDays).filter((day) => workingDays[day]);
        setFormData((prevData) => ({
            ...prevData,
            workingDays: selectedDays,
        }));

        // Log the current state of workingDays
        console.log("Updated workingDays:", workingDays);
    };

    const [newStation, setNewStation] = useState({
        stationName: "",
        arrivalTime: "",
        waitingTime: "",
        departureTime: "",
      });

    

    const handleStationChange = (event, index) => {
        const { name, value } = event.target;
        console.log("Name:", name);
        console.log("Value:", value);

        // Copy the current state
        const updatedStations = [...formData.middleStations];

        // Update the specific station based on the index
        updatedStations[index] = {
            ...updatedStations[index],
            [name]: value,
        };

        // Update formData with the updated station data
        setFormData({
            ...formData,
            middleStations: updatedStations,
        });

    };

    const handleAddStation = () => {

        // Create a new array for the station from newStation state
        const stationData = {
            stationName: newStation.stationName,
            arrivalTime: newStation.arrivalTime,
            waitingTime: newStation.waitingTime,
            departureTime: newStation.departureTime,
        };

        // Update stations array
        setStations((prevStations) => [...prevStations, stationData]);

        // Update formData.middleStations with the new station array
        setFormData((prevData) => ({
            ...prevData,
            middleStations: [...prevData.middleStations, stationData],
        }));

        // Reset newStation state to clear the text fields
        setNewStation({
            stationName: "",
            arrivalTime: "",
            waitingTime: "",
            departureTime: "",
        });

        // Initial Code
        // setStations((prevStations) => [...prevStations, newStation]);
        // setNewStation({
        //   stationName: "",
        //   arrivalTime: "",
        //   waitingTime: "",
        //   departureTime: "",
        // });

        // // Add the new station to the middleStations array
        // setFormData((prevData) => ({
        //     ...prevData,
        //     middleStations: [...prevData.middleStations, newStation],
        // }));
    };

    const[saveClicked, setSaveClicked] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();

        // Convert the workingDays object to an array
        const selectedDays = Object.keys(workingDays).filter((day) => workingDays[day]);

        // Update the formData with the selected days
        setFormData((prevData) => ({
            ...prevData,
            workingDays: selectedDays,
        }));

        

        if(validateForm()){

            try{
                const accessToken = localStorage.getItem("accessToken");
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                // const response = await axios.post(
                // "http://localhost:5000/api/add-user",
                // formData,
                // { headers }
                // );

                setSaveClicked(true);
            }catch(error){
                console.error("Error submitting form" , error);
            }
        }
        
    };

    return(
        <Container maxWidth="xl" className="secnd-main-container" 
        style={{
            display : 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        }}>
            <Paper elevation={3} className="existing-schedules">
                <Typography variant="h4" style={{color: '#3D50AC', flex: 4 }}>
                    <b>Existing Schedules for Train Name</b>
                </Typography>
            </Paper>

            <Paper elevation={3} className="adding-schedules">
                <Typography variant="h4" style={{
                color: '#3D50AC', 
                flex: 4,
                marginBottom: '10px'
                }}>
                    <b>Add New Schedule</b>
                </Typography>

                <form onSubmit={handleSave}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <TextField
                        label="Starting Station"
                        type="text"
                        name="startingStation"
                        value={formData.startingStation}
                        onChange={handleChange}
                        fullWidth
                        />                           
                            <div style={{ color: 'red' }}>{errors.startingStation}</div>
                            
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            label="Starting Time"
                            type="time"
                            name="startingTime"
                            value={formData.startingTime}
                            onChange={handleChange}
                            fullWidth
                            />

                            <div style={{ color: 'red' }}>{errors.startingTime}</div>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            label="Destination"
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            fullWidth
                            />

                            <div style={{ color: 'red' }}>{errors.destination}</div>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                            label="Finishing Time"
                            type="time"
                            name="finishingTime"
                            value={formData.finishingTime}
                            onChange={handleChange}
                            fullWidth
                            />

                            <div style={{ color: 'red' }}>{errors.finishingTime}</div>
                        </Grid>
                    </Grid>             

                    <Divider style={{ margin: "20px 0" }} />
              
                    <Typography variant="h5"
                    style={{ marginBottom: "10px", 
                    color: "#3D50AC" , 
                    marginTop: "1%"}}
                    >
                    <b>Working Days</b>
                    </Typography>

                    <div style={{ color: 'red' }}>{errors.workingDays}</div>

                    <Box display="grid" gridTemplateColumns={'Repeat(3, 1fr)'}>
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

                    {formData.middleStations.map((station, index) => (
                        <div key={index} style={{ marginTop: "20px" }}>
                            <Typography variant="subtitle1" style={{color: "#3D50AC"}}>
                                <b>Station {index + 1}</b>
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                    label="Station Name"
                                    type="text"
                                    name={`stationName-${index}`}
                                    value={station.stationName}
                                    onChange={(e) => handleStationChange(e, index)} 
                                    fullWidth
                                    style={{marginRight: "20px" }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                    label="Arrival Time"
                                    type="time"
                                    name={`arrivalTime-${index}`}
                                    value={station.arrivalTime}
                                    onChange={(e) => handleStationChange(e, index)}
                                    fullWidth
                                    style={{marginRight: "20px" }}
                                    />
                                </Grid>
                                
                                <Grid item xs={6}>
                                <TextField
                                label="Waiting Time"
                                type="text"
                                name={`waitingTime-${index}`}
                                value={station.waitingTime}
                                onChange={(e) => handleStationChange(e, index)}
                                fullWidth
                                style={{marginRight: "20px" }}
                                />
                                </Grid>
                                
                                <Grid item xs={6}>
                                <TextField
                                label="Departure Time"
                                type="time"
                                name={`departureTime-${index}`}
                                value={station.departureTime}
                                onChange={(e) => handleStationChange(e, index)}
                                fullWidth
                                style={{marginRight: "20px" }}
                                />
                                </Grid>                          

                                <Grid item xs={6}>
                                <Button
                                variant="contained"
                                color="primary"
                                // onClick={() => handleRemoveStation(index)}
                                >
                                Discard
                                </Button>
                                </Grid>
                            </Grid>
                            
                        </div>
                    ))}

                    <br></br>
                    <br></br>
                    <div style={{ color: 'red' }}>{errors.middleStations}</div>

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
                </form>
            </Paper>
        </Container>
    );

};

export default AddSchedule;