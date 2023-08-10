import React from "react";

const TrainAnimation = () => {
  return (
    <div style={styles.trainContainer}>
      <div style={styles.train}>
        <div style={styles.carriage} />
        <div style={styles.carriage} />
        <div style={styles.carriage} />
      </div>
    </div>
  );
};

const styles = {
  trainContainer: {
    width: "100%",
    height: "100px",
    position: "relative",
    overflow: "hidden",
  },
  train: {
    width: "300px",
    height: "100px",
    display: "flex",
    position: "absolute",
    top: 0,
    left: "100%",
    animation: "trainAnimation 10s linear infinite",
  },
  carriage: {
    width: "80px",
    height: "80px",
    backgroundColor: "#FA6F5D",
    margin: "10px",
    borderRadius: "10px",
  },
  "@keyframes trainAnimation": {
    "0%": {
      transform: "translateX(100%)",
    },
    "100%": {
      transform: "translateX(-100%)",
    },
  },
};

export default TrainAnimation;
