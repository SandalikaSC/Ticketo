import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

import { Paper,
    Typography,
    Container,
    Grid,
    TextField,
    Divider,
    Button,
    Box,
    Checkbox,
    FormControlLabel,
    Select,
    InputLabel
 } from "@mui/material";
import '../../css/cc_addTrainSchedule.css';
import { Repeat } from "@mui/icons-material";
import { padding } from "@mui/system";

const AddSchedule = () =>{

    let loadSchedules = false;

    //Get the train ID and train Name here
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const trainID = params.get('trainID');
    const trainName = params.get('trainName');
    //console.log(trainID);
    //console.log(trainName);

    const[formFields, setFormFields] = useState([
        {stationName: '', arrivalTime: '', waitingTime: '', departureTime: ''},
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    useEffect(() => {
        if (formFields) {
            setFormData((prevData) => ({
                ...prevData,
                stations: formFields,
            }));
        }
      }, [formFields]);

    useEffect(() => {
    if (loadSchedules) {
        fetchSchedules(trainID);
    }
    }, [loadSchedules]);

    const addFields = () => {
        let object = {
            stationName: '', 
            arrivalTime: '', 
            waitingTime: '', 
            departureTime: ''
        }

        setFormFields([...formFields,object]);
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setFormFields(data);
    }

    const [stations, setStations] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchStations();
        fetchSchedules(trainID);
      }, []);

    const fetchStations = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/allStations");
          setStations(response.data.stations);
          console.log(stations);
        } catch (error) {
          console.error("Error fetching stations:", error);
        }
    };

    const fetchSchedules = async (trainID) => {
        
        try{
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const response = await axios.post(
                "http://localhost:5000/api/get-schedule-for-train",
                { trainId: trainID },
                { headers }
                );
            //console.log("responeseeefefrfr");
            setSchedules(response.data.schedules);
        }catch(error){
            console.error("Error fetching schedules:", error);
        }
    };

    const [errors, setErrors] = useState({});    

    const [formData, setFormData] = useState({
        startingStation: "",
        startingTime: "",
        destination: "",
        finishingTime: "",
        workingDays: [],
        stations: [],
        trainID: trainID
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

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
        WEEKDAYS: false,
        WEEKENDS: false,
        SUNDAY: false,               
        HOLIDAY: false,
    });

    const validateForm = () => {
        
        const newErrors = {};
    
        if (!formData.startingStation) {
            // console.log("startingStation start");
          newErrors.startingStation = "Starting station is required";
        }
    
        if (!formData.startingTime) {
        //   console.log("startingTime start");
          newErrors.startingTime = "Starting time is required";
        }
    
        if (!formData.destination) {
            // console.log("destination start");
          newErrors.destination = "Destination is required";
        }

        if (!formData.finishingTime) {
            // console.log("finishingTime start");
            newErrors.finishingTime = "Finishing time is required";
          }

        if (formData.workingDays.length===0) {
            // console.log(formData.workingDays);
            newErrors.workingDays = "Working days are required";
        }

        // if (formData.middleStations.length===0) {
        //     console.log(formData.middleStations);
        //     newErrors.middleStations = "Required to enter middle stations";
        // }
    
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



    const[saveClicked, setSaveClicked] = useState(false);

    const handleSave = async (event) => {
        event.preventDefault();

        // Convert the workingDays object to an array
        const selectedDays = Object.keys(workingDays).filter((day) => workingDays[day]);

        // Update the formData with the selected days
        setFormData((prevData) => ({
            ...prevData,
            workingDays: selectedDays,
        }));

        //Check if values are properly set
        // console.log(formData.startingStation);
        // console.log(formData.startingTime);
        // console.log(formData.destination);
        // console.log(formData.finishingTime);
        // console.log(formData.workingDays);
        
        //Setting the middle stations
        setFormData((prevData) => ({
            ...prevData,
            stations: formFields,
        }));

        //Check if intermediate stations are properly set
        console.log(formData.stations);

        if(validateForm()){

            try{
                const accessToken = localStorage.getItem("accessToken");
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                const response = await axios.post(
                "http://localhost:5000/api/add-schedule",
                formData,
                { headers }
                );

                if (response.status === 201) {
                    // Clear form data after successful submission
                    setFormData({
                      startingStation: "",
                      startingTime: "",
                      destination: "",
                      finishingTime: "",
                      workingDays: [],
                      stations: []
                    });

                    handleChange = true;
                }

            }catch(error){
                console.error("Error submitting form" , error);
            }
        }
        
    };

    const handleDelete = async (scheduleId) => {
        try{
            console.log(scheduleId);
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const response = await axios.post(
                "http://localhost:5000/api/delete-train-Schedule",
                { scheduleID: scheduleId },
                { headers }
                );
            console.log("responeseeefefrfr");
            
            if(response.status === 200){
                fetchSchedules(trainID);
            }
        }catch(error){
            console.error("Error fetching schedules:", error);
        }
    }

    return(
        <Container maxWidth="xl" className="secnd-main-container" 
        style={{
            display : 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        }}>

            {/* Viewing existing schedules */}
            <Paper elevation={3} className="existing-schedules">
                <Typography variant="h4" style={{color: '#3D50AC', flex: 4 }}>
                    <b>Existing Schedules for {trainName}</b>
                </Typography>

                <br></br>
                <br></br>
                
                {schedules.map((element) => (
                    <Paper style={{marginBottom: '10px', padding: '10px', display: 'flex'}}>
                        <div>
                            <div style={{display: 'flex'}}>
                                <Typography variant="h5" style={{color: '#3D50AC'}}>
                                    <b>Schedule ID : </b>
                                </Typography>

                                <Typography variant="h5">
                                    {element.scheduleId}
                                </Typography>
                            </div>

                            <div style={{display: 'flex'}}>
                                <Typography style={{color: '#3D50AC'}}>
                                    <b>Starting Station :</b> 
                                </Typography>

                                <Typography>
                                    {element.start}
                                </Typography>
                            </div>

                            <div style={{display: 'flex'}}>
                                <Typography style={{color: '#3D50AC'}}>
                                    <b>Starting Time :</b> 
                                </Typography>

                                <Typography>
                                    {element.startTime}
                                </Typography>
                            </div>

                            <div style={{display: 'flex'}}>
                                <Typography style={{color: '#3D50AC'}}>
                                    <b>Ending Station :</b>
                                </Typography>

                                <Typography>
                                    {element.end}
                                </Typography>
                            </div>

                            <div style={{display: 'flex'}}>
                            <Typography style={{color: '#3D50AC'}}>
                                <b>Ending time :</b> 
                            </Typography>

                            <Typography>
                                {element.endTime}
                            </Typography>
                        </div>

                        <div style={{display: 'flex'}}>
                            <Typography style={{color: '#3D50AC'}}>
                                <b>Available Days :</b> 
                            </Typography>

                            <Typography>
                                {element.workingDays}
                            </Typography>
                        </div>
                            
                        </div>

                        <div>
                            <Button style={{backgroundColor : 'Maroon', 
                            color: 'White', 
                            borderRadius: '10px',
                            marginLeft: '100px',
                            marginTop: '100px'
                            }}
                            onClick={() => handleDelete(element.scheduleId)}
                            >
                                Delete
                            </Button>
                        </div>

                    </Paper>

                    
                ))}

                {/* {schedules.map((s) => (
                    console.log(s)
                ))} */}

                
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
                        
                        <InputLabel>Select Starting Station</InputLabel>
                            <select
                                name="startingStation"
                                value={formData.startingStation}
                                onChange={handleChange}
                                label="Starting Station"
                                className="scheduleSelect"
                                fullWidth
                            >
                                
                                {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                                ))}
                            </select>
                            
                            <div style={{ color: 'red' }}>{errors.startingStation}</div>
                            
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel>Select starting time</InputLabel>

                            <TextField
                            type="time"
                            name="startingTime"
                            value={formData.startingTime}
                            onChange={handleChange}
                            fullWidth
                            />

                            <div style={{ color: 'red' }}>{errors.startingTime}</div>
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel>Select destination</InputLabel>

                            <select
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                label="Destination"
                                className="scheduleSelect"
                                fullWidth
                            >
                            
                                {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                                ))}
                            </select>

                            {/* <TextField
                            type="text"
                            name="destination"
                            value={formData.startingStation}
                            onChange={handleChange}
                            fullWidth
                            />  */}

                            <div style={{ color: 'red' }}>{errors.destination}</div>
                        </Grid>

                        <Grid item xs={6}>
                            <InputLabel>Select finishing time</InputLabel>

                            <TextField
                            type="time"
                            name="finishingTime"
                            value={formData.finishingTime}
                            onChange={handleChange}
                            fullWidth
                            />

                            <div style={{ color: 'red' }}>{errors.finishingTime}</div>
                        </Grid>
                    </Grid>             

                    <br></br>
                    <Typography variant="h6" style={{
                        color: '#3D50AC', 
                        flex: 4,
                        marginTop: '15px'
                    }}>
                    <b>Add Running days</b>
                    </Typography>
                    <Divider style={{ margin: "0 0 20px 0" }} />
              

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

                    <Typography variant="h6" style={{
                        color: '#3D50AC', 
                        flex: 4,
                        marginTop: '15px'
                    }}>
                    <b>Add Stations Between the End Points</b>
                    </Typography>
                    <Divider style={{ margin: "0 0 20px 0" }} />


                    {formFields.map((form, index) => {
                        return(
                            <div key={index}>
                                <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InputLabel>Select station</InputLabel>
                                    <select
                                        name={'stationName'}
                                        value={form.name}
                                        onChange={event => handleFormChange(event,index)}
                                        label="Destination"
                                        className="scheduleSelect"
                                        fullWidth
                                    >
                                        <option value="">Select a station</option>
                                        {stations.map((station) => (
                                        <option key={station.id} value={station.id}>
                                            {station.name}
                                        </option>
                                        ))}
                                    </select>
                                </Grid>

                                <Grid item xs={6}>
                                    <InputLabel>Arrival Time</InputLabel>
                                    <TextField
                                    type="time"
                                    name={'arrivalTime'}
                                    onChange={event => handleFormChange(event,index)}
                                    value={form.arrivalTime}
                                    fullWidth
                                    style={{marginRight: "20px" }}
                                    />
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <InputLabel>Waiting Time (In minutes)</InputLabel>
                                    <TextField
                                    name={'waitingTime'}
                                    onChange={event => handleFormChange(event,index)}
                                    value={form.waitingTime}
                                    fullWidth
                                    style={{marginRight: "20px" }}
                                    />
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <InputLabel>Departure Time</InputLabel>
                                    <TextField
                                    type="time"
                                    name={'departureTime'}
                                    onChange={event => handleFormChange(event,index)}
                                    value={form.departureTime}
                                    fullWidth
                                    style={{marginRight: "20px" }}
                                    />
                                </Grid>                          

                                <Grid item xs={6}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => removeFields(index) }
                                    >
                                    Discard
                                    </Button>
                                </Grid>
                             </Grid>
                             <br></br>
                            </div>
                            
                        )
                    })}
                    

                    <br></br>
                    <br></br>
                    {/* <div style={{ color: 'red' }}>{errors.middleStations}</div> */}

                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px" }}
                        onClick={addFields}
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