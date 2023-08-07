import React from "react";
import { useSelector } from "react-redux";

const AddTrain = () => {
  const reduxState = useSelector((state) => state); // Log the entire state
  console.log("Redux State:", reduxState);
  return (
    <Grid item xs={6}>
      <form
        style={{
          backgroundColor: "white",
          overflowY: "auto",
          maxHeight: "75vh",
          padding: "5%",
          marginTop: "3%",
          marginBottom: "3%",
          borderRadius: "20px",
          marginRight: "30px",
          marginLeft: "270px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            backgroundColor: "#3D51A9",
            color: "white",
            padding: "8px 20px",
            marginBottom: "10px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginLeft: "35%" }}>Add Train</h2>
        </div>
        <div>
          <label htmlFor="trainName">Train Name</label>
          <TextField
            id="trainName"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <label htmlFor="trainNumber">Train Number</label>
          <TextField
            id="trainNumber"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <label htmlFor="numCoaches">Number of Coaches</label>
          <TextField
            id="numCoaches"
            type="number"
            value={numberOfCoaches}
            onChange={(e) => setNumberOfCoaches(parseInt(e.target.value))}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </div>
        {[...Array(numberOfCoaches)].map((_, index) => (
          <div key={index}>
            <h3>Coach {index + 1}</h3>
            <div>
              <label htmlFor={`coachCode${index}`}>Coach Code</label>
              <TextField
                id={`coachCode${index}`}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <label htmlFor={`coachClass${index}`}>Coach Class</label>
              <TextField
                id={`coachClass${index}`}
                select
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </TextField>
            </div>
            <div>
              <label htmlFor={`seatCapacity${index}`}>Seat Capacity</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  id={`seatCapacity${index}`}
                  type="number"
                  margin="normal"
                  fullWidth
                  defaultValue={48}
                  inputProps={{ style: { textAlign: "center" } }}
                  variant="outlined"
                />
                <IconButton>
                  <AddIcon />
                </IconButton>
              </div>
            </div>
            <div>
              <label htmlFor={`seatArrangement${index}`}>
                Seat Arrangement
              </label>
              <TextField
                id={`seatArrangement${index}`}
                select
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="5_in_a_row">5 in a row</MenuItem>
                <MenuItem value="4_in_a_row">4 in a row</MenuItem>
                <MenuItem value="2_in_a_column">2 in a column</MenuItem>
              </TextField>
            </div>
            <div>
              <Checkbox color="primary" />
              <label htmlFor={`isReservable${index}`}>Is Reservable</label>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Train
          </Button>
        </div>
      </form>
    </Grid>
  );
};

export default AddTrain;
