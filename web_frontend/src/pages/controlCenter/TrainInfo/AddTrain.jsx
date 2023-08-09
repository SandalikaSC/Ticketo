import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  MenuItem,
} from "@mui/material";
import TrainConfirmationDialog from "../../../components/controlCenter/TrainConfirmationDialog";
import WarningModal from "../../../components/common/WarningModal";
import { addTrain } from "../../../services/addTrainService";
const AddTrain = () => {
  const [inputs, setInputs] = useState({
    TC0: "", // Add other properties as needed
    TCR0: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trainName, setTrainName] = useState("");
  const [trainNumber, settrainNumber] = useState("");
  const [SCR, setSCR] = useState(0);
  const [SC, setSC] = useState(0);
  const [TCR, setTCR] = useState(0);
  const [TC, setTC] = useState(0);
  const [FC, setFC] = useState(0);
  const [SLEEPER, setSLEEPER] = useState(0);
  const [OFV, setOFV] = useState(0);
  const [errors, setErrors] = useState({});
  const [warningOpen, setWarningOpen] = useState(false);

  const TC0 = ["5 per row", "2 by side"];
  const TCR0 = ["5 per row", "4 per row"];
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const validateInputs = () => {
    const newErrors = {};
    console.log(inputs);

    if (!trainName.trim()) {
      newErrors.trainName = "Train Name is required";
    }

    if (!trainNumber.trim()) {
      newErrors.trainNumber = "Train Code is required";
    }

    // Validate second class input fields to be numbers
    if (!Number.isNaN(SCR)) {
      if (SCR < 0) {
        newErrors.SCR = "Invalid input";
      }
    } else {
      newErrors.SCR = "Invalid input";
    }

    if (!Number.isNaN(SC)) {
      if (SC < 0) {
        newErrors.SC = "Invalid input";
      }
    } else {
      newErrors.SC = "Invalid input";
    }

    if (!Number.isNaN(TCR)) {
      if (TCR < 0) {
        newErrors.TCR = "Invalid input";
      }
    } else {
      newErrors.TCR = "Invalid input";
    }

    if (!Number.isNaN(TC)) {
      if (TC < 0) {
        newErrors.TC = "Invalid input";
      }
    } else {
      newErrors.TC = "Invalid input";
    }

    if (!Number.isNaN(FC)) {
      if (FC < 0) {
        newErrors.FC = "Invalid input";
      }
    } else {
      newErrors.FC = "Invalid input";
    }

    if (!Number.isNaN(OFV)) {
      if (OFV < 0) {
        newErrors.OFV = "Invalid input";
      }
    } else {
      newErrors.OFV = "Invalid input";
    }

    if (!Number.isNaN(SLEEPER)) {
      if (SLEEPER < 0) {
        newErrors.SLEEPER = "Invalid input";
      }
    } else {
      newErrors.SLEEPER = "Invalid input";
    }

    setErrors(newErrors);
    console.log(Object.keys(newErrors).length);
    return Object.keys(newErrors).length === 0;
  };

  const handleTrainAddition = async () => {
    if (validateInputs()) {
      try {
        // Create an object with default values for all fields
        const trainData = {
          trainName,
          trainNumber,
          SCR,
          SC,
          TCR,
          TC, // Use user input if provided, otherwise default to 0
          FC,
          SLEEPER,
          OFV,
          TC0: inputs.TC0, // Use user input if provided, otherwise default to 0
          TCR0: inputs.TCR0,
        };

        // Override default values with provided values where applicable
        if (inputs.SCR) trainData.SCR = inputs.SCR;
        if (inputs.SC) trainData.SC = inputs.SC;
        if (inputs.TCR) trainData.TCR = inputs.TCR;
        if (inputs.FC) trainData.FC = inputs.FC;
        if (inputs.SLEEPER) trainData.SLEEPER = inputs.SLEEPER;
        if (inputs.OFV) trainData.OFV = inputs.OFV;
        if (inputs.TCR0) trainData.TCR0 = inputs.TCR0;

        console.log("trainData before addTrain:", trainData);
        await addTrain(trainData);
        handleDialogOpen();
      } catch (error) {
        console.error("Error adding train:", error);
        setWarningOpen(true);
      }
    } else {
      setWarningOpen(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ECECEC",
        minHeight: "90%",
        padding: "10px",
        display: "flex",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          paddingTop: "10px",
          display: "flex",
          marginLeft: "0",
          marginRight: "0",
        }}
      >
        <Paper
          elevation={3}
          style={{ backgroundColor: "white", padding: "20px", width: "100%" }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "#3D51A9",
              textAlign: "center",
              fontWeight: "bold",
              // marginBottom: "20px",
            }}
          >
            Add Train
          </Typography>
          <form style={{ maxWidth: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Train Name Validation */}
              <div style={{ width: "48%", marginBottom: "10px" }}>
                <Typography variant="body2" style={{ color: "red" }}>
                  {errors.trainName}
                </Typography>
                <TextField
                  label="Train Name"
                  fullWidth
                  value={trainName}
                  onChange={(e) => setTrainName(e.target.value)}
                  error={!!errors.trainName}
                />
              </div>

              {/* Train Code Validation */}
              <div style={{ width: "48%", marginBottom: "10px" }}>
                <Typography variant="body2" style={{ color: "red" }}>
                  {errors.trainNumber}
                </Typography>
                <TextField
                  label="Train Code"
                  fullWidth
                  value={trainNumber}
                  onChange={(e) => settrainNumber(e.target.value)}
                  error={!!errors.trainNumber}
                />
              </div>
            </div>
            {/* third class second class name  */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: "bold",
                  color: "#3D51A9",
                  fontSize: "1.2rem",
                }}
              >
                Second Class
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: "bold",
                  color: "#3D51A9",
                  marginRight: "35%",
                  fontSize: "1.2rem",
                }}
              >
                Third Class
              </Typography>
            </div>
            {/* subtopics */}
            <div style={{ display: "flex", gap: "5%" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, color: "grey" }}
                  >
                    Class Name
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ flex: 1, color: "grey" }}
                  >
                    No Of Coaches
                  </Typography>
                </div>
                {/* Second Class Reserved */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    Second Class Reserved
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={SCR}
                    onChange={(e) => setSCR(parseInt(e.target.value) || 0)}
                    error={!!errors.SCR}
                    helperText={errors.SCR}
                  />
                </div>
                {/* Second Class Not Reserved */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    Second Class Not Reserved
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={SC}
                    onChange={(e) => setSC(parseInt(e.target.value) || 0)}
                    error={!!errors.SC}
                    helperText={errors.SC}
                  />
                </div>
              </div>
              {/* Third Class */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, color: "grey" }}
                  >
                    Class Name
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ flex: 1, color: "grey" }}
                  >
                    No Of Coaches
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "20px", flex: 1, color: "grey" }}
                  >
                    Coach Type
                  </Typography>
                </div>
                {/* Second Class A */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    Third Class Reserved
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={TCR}
                    onChange={(e) => setTCR(parseInt(e.target.value) || 0)}
                    error={!!errors.TCR}
                    helperText={errors.TCR}
                  />
                  <TextField
                    name="TCR0"
                    select
                    value={inputs.TCR0}
                    variant="outlined"
                    placeholder="Coach Type"
                    style={{ width: "30%" }}
                    onChange={handleChange}
                  >
                    {TCR0.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                {/* Third Class Not Reserved */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    Third Class Not Reserved
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={TC}
                    onChange={(e) => setTC(parseInt(e.target.value) || 0)}
                    error={!!errors.TC}
                    helperText={errors.TC}
                  />
                  <TextField
                    name="TC0"
                    select
                    value={inputs.TC0}
                    variant="outlined"
                    placeholder="Coach Type"
                    style={{ width: "30%" }}
                    onChange={handleChange}
                  >
                    {TC0.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
            {/* First Class */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: "bold",
                  color: "#3D51A9",
                  fontSize: "1.2rem",
                }}
              >
                First Class
              </Typography>
            </div>
            <div style={{ display: "flex", gap: "5%" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, color: "grey" }}
                  >
                    Class Name
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ flex: 1, color: "grey" }}
                  >
                    No Of Coaches
                  </Typography>
                </div>
                {/* First Class A/C Reserved */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    First Class A/C Reserved
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={FC}
                    onChange={(e) => setFC(parseInt(e.target.value) || 0)}
                    error={!!errors.FC}
                    helperText={errors.FC}
                  />
                </div>
                {/* Sleeper Class */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    Sleeper Class
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={SLEEPER}
                    onChange={(e) => setSLEEPER(parseInt(e.target.value) || 0)}
                    error={!!errors.SLEEPER}
                    helperText={errors.SLEEPER}
                  />
                </div>
                {/* Observer Class */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ marginRight: "20px", flex: 1, fontWeight: "bold" }}
                  >
                    Observer Class
                  </Typography>

                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={OFV}
                    onChange={(e) => setOFV(parseInt(e.target.value) || 0)}
                    error={!!errors.OFV}
                    helperText={errors.OFV}
                  />
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#3D51A9",
                color: "white",
                fontWeight: "bolder",
              }}
              fullWidth
              onClick={() => {
                if (validateInputs()) {
                  // handleDialogOpen();
                  handleTrainAddition();
                } else {
                  setWarningOpen(true); // Open the warning modal
                }
              }}
            >
              <h3>Add Train</h3>
            </Button>
            <WarningModal
              open={warningOpen}
              onClose={() => setWarningOpen(false)}
              content="Please fill out all the required fields."
            />
          </form>
          <TrainConfirmationDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            // onConfirm={handleTrainAddition}
            trainDetails="galu kumari"
          />
        </Paper>
      </Container>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          marginTop: "10px",
          width: "60%",
        }}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold",
            color: "#3D51A9",
          }}
        >
          Seat Arrangement
        </Typography>
        <Divider />
        <Paper
          elevation={3}
          style={{
            padding: "5%",
            border: "1px solid #ccc",
            marginBottom: "10px",
            marginTop: "5%",
            borderRadius: "15px",
            backgroundColor: "#3D51A9",
          }}
        >
          <Typography
            variant="body2"
            style={{
              // color: "#FA6F5D",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <h4>
              *Please note that the following seat arrangement details will be
              added by default for each train.
            </h4>
          </Typography>
        </Paper>
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#F5F5F5",
            padding: "3%",
            borderRadius: "25px",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            First Class Seat Arrangement<hr></hr>
          </Typography>
          {/* ... First Class Fields ... */}
          {/* Example Coach Type */}
          <div
            style={{
              backgroundColor: "white",
              padding: "3%",
              marginRight: "10%",
              marginLeft: "10%",
              marginTop: "2%",
              borderRadius: "25px",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginTop: "20px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>First Class A/C </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>

            <Typography
              variant="body2"
              style={{ marginTop: "20px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Observer Class </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "20px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Sleeper Class </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>

            {/* ... Seat Arrangement Fields for Coach Type B ... */}
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#F5F5F5",
            padding: "3%",
            borderRadius: "25px",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            SecondClass Seat Arrangement<hr></hr>
          </Typography>
          <div
            style={{
              backgroundColor: "white",
              padding: "3%",
              marginRight: "10%",
              marginLeft: "10%",
              marginTop: "3%",
              borderRadius: "25px",
            }}
          >
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Secon Class Reserved</div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Second Class non Reserved </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrain;
