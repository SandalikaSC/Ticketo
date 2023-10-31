import React, { useState, useEffect } from "react";
import { Container, Typography, Divider, Paper, Button } from "@mui/material";
import Drawer from "../../../components/controlCenter/Drawer";
import TrainInfo from "../../../components/controlCenter/TrainInfo";
import MapContainer from "../../../components/controlCenter/MapContainer";
import { useLocation } from "react-router-dom";

const DelayPage = () => {
  //   const location = useLocation();
  //   const notification = notificationDetails?.location?.state?.notification;

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* <div style={{ flex: 1 }}>
          <h2>Notification Details</h2>
          {{} ? (
            //   <div>jjjjdj</div>
            <div></div>
          ) : (
            <p>No notification details available.</p>
          )}
        </div> */}

      <div style={{ flex: 1 }}>
        <MapContainer />
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen}>
        <TrainInfo />
      </Drawer>

      {/* Toggle button */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: isDrawerOpen ? "30%" : 0,
          transform: "translateY(-50%)",
          padding: "10px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "right 0.3s ease-in-out",
        }}
        onClick={handleToggleDrawer}
      >
        <div style={{ fontSize: "20px" }}>{isDrawerOpen ? "►" : "◄"}</div>
      </div>
    </div>
  );
};

export default DelayPage;
