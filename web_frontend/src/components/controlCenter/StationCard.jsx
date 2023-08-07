import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Train } from "@mui/icons-material";
import "../../css/stationCard.css"; // Update the path to your CSS file

function StationCard({ stationName, arrivalTime, departureTime }) {
  return (
    <Card className="card">
      <CardMedia className="station-icon">
        <Train fontSize="large" />
      </CardMedia>
      <CardContent className="station-info">
        <Typography variant="h7" className="station-name">
          {stationName}
        </Typography>
        <div className="time-container">
          <Typography variant="body2" className="arrival-time">
            {arrivalTime}
          </Typography>
          <Typography variant="body2" className="departure-time">
            {departureTime}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

StationCard.propTypes = {
  stationName: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
};

export default StationCard;
