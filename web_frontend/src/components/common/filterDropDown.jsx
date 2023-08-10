import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterDropdown = ({ items, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel style={{width: '30%'}}>Filter</InputLabel>
      <Select
        value={selectedFilter}
        onChange={handleFilterChange}
        startIcon={<FilterListIcon />}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
