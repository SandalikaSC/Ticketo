import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function DelayCard({ trainName, trainNumber, date, departureStation, arrivalTime, delay, reason }) {
  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">{trainName} (Train #{trainNumber})</Typography>
        <Typography>Date: {date}</Typography>
        <Typography>Departure: {departureStation}</Typography>
        <Typography>Arrival Time: {arrivalTime}</Typography>
        <Typography>Delay: {delay} minutes</Typography>
        <Typography>Reason: {reason}</Typography>
      </CardContent>
    </Card>
  );
}

export default DelayCard;
