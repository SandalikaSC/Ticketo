import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D51A9",
    },
    secondary: {
      main: "#FA6F5D",
    },
  },
});

const initialCoachData = {
  coachCode: "",
  coachClass: "",
  seatCapacity: 48,
  seatArrangement: "",
  reservable: false,
};

const AddTrain = () => {
  const reduxState = useSelector((state) => state);
  console.log("Redux State:", reduxState);

  const [numberOfCoaches, setNumberOfCoaches] = useState(1);
  const [coachesData, setCoachesData] = useState([initialCoachData]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleCoachDataChange = (index, field, value) => {
    const updatedCoachesData = coachesData.map((coach, i) =>
      i === index ? { ...coach, [field]: value } : coach
    );
    setCoachesData(updatedCoachesData);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < numberOfCoaches) {
      setCurrentStep(currentStep + 1);
    } else {
      setCoachesData([...coachesData, initialCoachData]);
      setNumberOfCoaches(numberOfCoaches + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", margin: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <form
              style={{
                overflowY: "auto",
                maxHeight: "80vh",
                paddingRight: "20px",
              }}
            >
              {/* Train Info */}
              <h2 style={{ color: "#3D51A9" }}>Add Train</h2>
              {currentStep === 0 && (
                <>
                  <TextField
                    label="Train Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Train Number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Number of Coaches"
                    type="number"
                    value={numberOfCoaches}
                    onChange={(e) => {
                      const newNumber = parseInt(e.target.value);
                      setNumberOfCoaches(newNumber);
                    }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </>
              )}

              {/* Coaches Info */}
              {coachesData.map((coach, index) => (
                <div
                  key={index}
                  style={{
                    display: currentStep === index + 1 ? "block" : "none",
                  }}
                >
                  <h3>Coach {index + 1}</h3>
                  {/* Coach Details */}
                  <TextField
                    label="Coach Code"
                    fullWidth
                    margin="normal"
                    value={coach.coachCode}
                    onChange={(e) =>
                      handleCoachDataChange(index, "coachCode", e.target.value)
                    }
                    variant="outlined"
                  />
                  <TextField
                    label="Coach Class"
                    select
                    fullWidth
                    margin="normal"
                    value={coach.coachClass}
                    onChange={(e) =>
                      handleCoachDataChange(index, "coachClass", e.target.value)
                    }
                    variant="outlined"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </TextField>
                  {/* Seat Capacity */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        handleCoachDataChange(
                          index,
                          "seatCapacity",
                          coach.seatCapacity - 1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      value={coach.seatCapacity}
                      margin="normal"
                      fullWidth
                      inputProps={{ style: { textAlign: "center" } }}
                      variant="outlined"
                    />
                    <IconButton
                      onClick={() =>
                        handleCoachDataChange(
                          index,
                          "seatCapacity",
                          coach.seatCapacity + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  {/* Seat Arrangement */}
                  <TextField
                    label="Seat Arrangement"
                    select
                    fullWidth
                    margin="normal"
                    value={coach.seatArrangement}
                    onChange={(e) =>
                      handleCoachDataChange(
                        index,
                        "seatArrangement",
                        e.target.value
                      )
                    }
                    variant="outlined"
                  >
                    <MenuItem value="5_in_a_row">5 in a row</MenuItem>
                    <MenuItem value="4_in_a_row">4 in a row</MenuItem>
                    <MenuItem value="2_in_a_column">2 in a column</MenuItem>
                  </TextField>
                  {/* Is Reservable */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={coach.reservable}
                        onChange={(e) =>
                          handleCoachDataChange(
                            index,
                            "reservable",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Is Reservable"
                  />
                </div>
              ))}

              {/* Navigation Buttons */}
              <div>
                <IconButton
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  <RemoveIcon />
                </IconButton>
                {currentStep < numberOfCoaches ? (
                  <IconButton onClick={handleNextStep}>
                    <AddIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleNextStep}>Add Train</IconButton>
                )}
              </div>
            </form>
          </Grid>
          <Grid item xs={6}>
            {/* Dummy Data */}
            <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <h2 style={{ color: "#3D51A9" }}>Train Info</h2>
              <p>Train Name: Sample Train</p>
              <p>Train Number: 12345</p>
              <h2 style={{ color: "#3D51A9" }}>Coaches Info</h2>
              <ul>
                {coachesData.map((coach, index) => (
                  <li key={index}>
                    <strong>Coach {index + 1}</strong>
                    <p>Code: {coach.coachCode}</p>
                    <p>Class: {coach.coachClass}</p>
                    <p>Seat Capacity: {coach.seatCapacity}</p>
                    <p>Seat Arrangement: {coach.seatArrangement}</p>
                    <p>Reservable: {coach.reservable ? "Yes" : "No"}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default AddTrain;
