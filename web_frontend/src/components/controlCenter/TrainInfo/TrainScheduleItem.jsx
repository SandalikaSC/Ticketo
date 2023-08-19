import React from "react";
import TrainIcon from "@mui/icons-material/Train";
import "../../../css/traininfo.css";

const TrainScheduleItem = ({ item, onClick }) => {
  return (
    <div className="cc-schedule-item" onClick={onClick}>
      <div className="cc-train-icon">
        <TrainIcon />
      </div>
      <div className="cc-train-info">
        <div className="cc-train-name">{item.trainName}</div>
        <div className="cc-working-days">Monday, Friday, Sunday Only</div>
      </div>
      <div className="cc-departure-arrival">
        <div className="cc-departure-time">8.00 a.m - 11.00 a.m</div>
        <div className="cc-working-days">Galle - Colombo</div>
      </div>
    </div>
  );
};

export default TrainScheduleItem;
