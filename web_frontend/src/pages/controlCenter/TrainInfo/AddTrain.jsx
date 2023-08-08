import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import TrainConfirmationDialog from "../../../components/controlCenter/TrainConfirmationDialog";
import WarningModal from "../../../components/common/WarningModal";

const AddTrain = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trainName, setTrainName] = useState("");
  const [trainCode, setTrainCode] = useState("");
  const [secondClassReserved, setSecondClassReserved] = useState(0);
  const [secondClassNonReserved, setSecondClassNonReserved] = useState(0);
  const [secondClass2Reserved, setSecondClass2Reserved] = useState(0);
  const [secondClass2NonReserved, setSecondClass2NonReserved] = useState(0);
  const [thirdClassReserved, setthirdClassReserved] = useState(0);
  const [thirdClassNonReserved, setthirdClassNonReserved] = useState(0);
  const [thirdClass2Reserved, setthirdClass2Reserved] = useState(0);
  const [thirdClass2NonReserved, setthirdClass2NonReserved] = useState(0);
  const [firstClassReserved, setfirstClassReserved] = useState(0);
  const [firstClassNonReserved, setfirstClassNonReserved] = useState(0);
  const [sleeperClassReserved, setsleeperClassReserved] = useState(0);
  const [sleeperClassNonReserved, setsleeperClassNonReserved] = useState(0);
  const [observerClassReserved, setobserverClassReserved] = useState(0);
  const [observerClassNonReserved, setobserverClassNonReserved] = useState(0);
  const [errors, setErrors] = useState({});
  const [warningOpen, setWarningOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!trainName.trim()) {
      newErrors.trainName = "Train Name is required";
    }

    if (!trainCode.trim()) {
      newErrors.trainCode = "Train Code is required";
    }

    // Validate second class input fields to be numbers
    if (!Number.isNaN(secondClassReserved)) {
      if (secondClassReserved < 0) {
        newErrors.secondClassReserved = "Invalid input";
      }
    } else {
      newErrors.secondClassReserved = "Invalid input";
    }

    if (!Number.isNaN(secondClassNonReserved)) {
      if (secondClassNonReserved < 0) {
        newErrors.secondClassNonReserved = "Invalid input";
      }
    } else {
      newErrors.secondClassNonReserved = "Invalid input";
    }

    if (!Number.isNaN(secondClass2Reserved)) {
      if (secondClass2Reserved < 0) {
        newErrors.secondClass2Reserved = "Invalid input";
      }
    } else {
      newErrors.secondClass2Reserved = "Invalid input";
    }

    if (!Number.isNaN(secondClass2NonReserved)) {
      if (secondClass2NonReserved < 0) {
        newErrors.secondClass2NonReserved = "Invalid input";
      }
    } else {
      newErrors.secondClass2NonReserved = "Invalid input";
    }

    if (!Number.isNaN(thirdClassReserved)) {
      if (thirdClassReserved < 0) {
        newErrors.thirdClassReserved = "Invalid input";
      }
    } else {
      newErrors.thirdClassReserved = "Invalid input";
    }

    if (!Number.isNaN(thirdClassNonReserved)) {
      if (thirdClassNonReserved < 0) {
        newErrors.thirdClassNonReserved = "Invalid input";
      }
    } else {
      newErrors.thirdClassNonReserved = "Invalid input";
    }

    if (!Number.isNaN(thirdClass2Reserved)) {
      if (thirdClass2Reserved < 0) {
        newErrors.thirdClass2Reserved = "Invalid input";
      }
    } else {
      newErrors.thirdClass2Reserved = "Invalid input";
    }

    if (!Number.isNaN(thirdClass2NonReserved)) {
      if (thirdClass2NonReserved < 0) {
        newErrors.thirdClass2NonReserved = "Invalid input";
      }
    } else {
      newErrors.thirdClass2NonReserved = "Invalid input";
    }

    if (!Number.isNaN(firstClassReserved)) {
      if (firstClassReserved < 0) {
        newErrors.firstClassReserved = "Invalid input";
      }
    } else {
      newErrors.firstClassReserved = "Invalid input";
    }

    if (!Number.isNaN(firstClassNonReserved)) {
      if (firstClassNonReserved < 0) {
        newErrors.firstClassNonReserved = "Invalid input";
      }
    } else {
      newErrors.firstClassNonReserved = "Invalid input";
    }

    if (!Number.isNaN(observerClassReserved)) {
      if (observerClassReserved < 0) {
        newErrors.observerClassReserved = "Invalid input";
      }
    } else {
      newErrors.observerClassReserved = "Invalid input";
    }

    if (!Number.isNaN(observerClassNonReserved)) {
      if (observerClassNonReserved < 0) {
        newErrors.observerClassNonReserved = "Invalid input";
      }
    } else {
      newErrors.observerClassNonReserved = "Invalid input";
    }

    if (!Number.isNaN(sleeperClassReserved)) {
      if (sleeperClassReserved < 0) {
        newErrors.sleeperClassReserved = "Invalid input";
      }
    } else {
      newErrors.sleeperClassReserved = "Invalid input";
    }

    if (!Number.isNaN(sleeperClassNonReserved)) {
      if (sleeperClassNonReserved < 0) {
        newErrors.sleeperClassNonReserved = "Invalid input";
      }
    } else {
      newErrors.sleeperClassNonReserved = "Invalid input";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTrainAddition = () => {
    if (validateInputs()) {
      handleDialogOpen();
    } else {
      setWarningOpen(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ECECEC",
        minHeight: "100vh",
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
                  {errors.trainCode}
                </Typography>
                <TextField
                  label="Train Code"
                  fullWidth
                  value={trainCode}
                  onChange={(e) => setTrainCode(e.target.value)}
                  error={!!errors.trainCode}
                />
              </div>
            </div>

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
                    Reserved
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "20px", flex: 1, color: "grey" }}
                  >
                    Not Reserved
                  </Typography>
                </div>
                {/* First Class A */}
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
                    value={secondClassReserved}
                    onChange={(e) =>
                      setSecondClassReserved(parseInt(e.target.value))
                    }
                    error={!!errors.secondClassReserved}
                    helperText={errors.secondClassReserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={secondClassNonReserved}
                    onChange={(e) =>
                      setSecondClassNonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.secondClassNonReserved}
                    helperText={errors.secondClassNonReserved}
                  />
                </div>
                {/* First Class B */}
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
                    value={secondClass2Reserved}
                    onChange={(e) =>
                      setSecondClass2Reserved(parseInt(e.target.value))
                    }
                    error={!!errors.secondClass2Reserved}
                    helperText={errors.secondClass2Reserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={secondClass2NonReserved}
                    onChange={(e) =>
                      setSecondClass2NonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.secondClass2NonReserved}
                    helperText={errors.secondClass2NonReserved}
                  />
                </div>
              </div>
              {/* Second Class */}
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
                    Reserved
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "20px", flex: 1, color: "grey" }}
                  >
                    Not Reserved
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
                    value={thirdClassReserved}
                    onChange={(e) =>
                      setthirdClassReserved(parseInt(e.target.value))
                    }
                    error={!!errors.thirdClassReserved}
                    helperText={errors.thirdClassReserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={thirdClassNonReserved}
                    onChange={(e) =>
                      setthirdClassNonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.thirdClassNonReserved}
                    helperText={errors.thirdClassNonReserved}
                  />
                </div>
                {/* Second Class B */}
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
                    value={thirdClass2Reserved}
                    onChange={(e) =>
                      setthirdClass2Reserved(parseInt(e.target.value))
                    }
                    error={!!errors.thirdClass2Reserved}
                    helperText={errors.thirdClass2Reserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={thirdClass2NonReserved}
                    onChange={(e) =>
                      setthirdClass2NonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.thirdClass2NonReserved}
                    helperText={errors.thirdClass2NonReserved}
                  />
                </div>
              </div>
            </div>
            {/* Third Class */}
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
                    Reserved
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ marginLeft: "20px", flex: 1, color: "grey" }}
                  >
                    Not Reserved
                  </Typography>
                </div>
                {/* Third Class A */}
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
                    value={firstClassReserved}
                    onChange={(e) =>
                      setfirstClassReserved(parseInt(e.target.value))
                    }
                    error={!!errors.firstClassReserved}
                    helperText={errors.firstClassReserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={firstClassNonReserved}
                    onChange={(e) =>
                      setfirstClassNonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.firstClassNonReserved}
                    helperText={errors.firstClassNonReserved}
                  />
                </div>
                {/* Third Class B */}
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
                    value={sleeperClassReserved}
                    onChange={(e) =>
                      setsleeperClassReserved(parseInt(e.target.value))
                    }
                    error={!!errors.sleeperClassReserved}
                    helperText={errors.sleeperClassReserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={sleeperClassNonReserved}
                    onChange={(e) =>
                      setsleeperClassNonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.sleeperClassNonReserved}
                    helperText={errors.sleeperClassNonReserved}
                  />
                </div>
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
                    value={observerClassReserved}
                    onChange={(e) =>
                      setobserverClassReserved(parseInt(e.target.value))
                    }
                    error={!!errors.observerClassReserved}
                    helperText={errors.observerClassReserved}
                  />
                  <TextField
                    type="number"
                    style={{ marginRight: "20px", flex: 1 }}
                    value={observerClassNonReserved}
                    onChange={(e) =>
                      setobserverClassNonReserved(parseInt(e.target.value))
                    }
                    error={!!errors.observerClassNonReserved}
                    helperText={errors.observerClassNonReserved}
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
                  handleDialogOpen();
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
            onConfirm={handleTrainAddition}
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
            marginTop: "20px",
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
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>First Class A/C </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>First Class non A/C </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Observer Class </div>

                <div style={{ color: "#3D51A9" }}>4 seats per row</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontWeight: "bold" }}
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
            marginTop: "20px",
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
              marginTop: "2%",
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
        <div
          style={{
            marginTop: "20px",
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
            Third Class Seat Arrangement<hr></hr>
          </Typography>
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
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Third Class Reserved</div>

                <div style={{ color: "#3D51A9" }}>5 seats per row</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "10px", fontWeight: "bold" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Third Class non Reserved </div>

                <div style={{ color: "#3D51A9" }}>5 seats per row</div>
              </div>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrain;
