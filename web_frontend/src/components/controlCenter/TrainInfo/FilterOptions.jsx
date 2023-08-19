import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import "../../../css/traininfo.css"; // Import the separated styles

const FilterOptions = () => {
  return (
    <div className="cc-filter-options">
      <div className="cc-filter-group">
        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          className="cc-select"
        >
          <InputLabel htmlFor="filterTrainName">Select Train</InputLabel>
          <Select
            label="Select Train"
            inputProps={{ name: "filterTrainName", id: "filterTrainName" }}
          >
            <MenuItem value="train1">Samudra Devi</MenuItem>
            <MenuItem value="train2">Galu Kumari</MenuItem>
          </Select>
        </FormControl>

        {/* ... Other filter options ... */}

        <Button
          variant="contained"
          color="primary"
          className="cc-filter-button"
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterOptions;
