import React from "react";
import { useSelector } from "react-redux";

const AddTrain = () => {
  const reduxState = useSelector((state) => state); // Log the entire state
  console.log("Redux State:", reduxState);
  return (
    <div>
      <h1>Add Trains</h1>
    </div>
  );
};

export default AddTrain;
