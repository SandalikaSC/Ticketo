import React, { useState } from 'react';
import { Container, Card, Typography, TextField, Button } from '@mui/material';
import QRimage from '../../assets/qr.png';
import cardImage from '../../assets/card.png';

const TicketPurchase = () => {
  const [ticketData, setTicketData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('oneWay');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleQuickTicket = () => {
    // Simulate fetching data from the server
    const dataFromServer = {
      ticketId: '000234',
      startStation: 'Colombo Fort',
      endStation: 'Nanu Oya',
      departureDate: '2023-08-01',
      arrivalDate: '2023-08-01',
      passengers: 2,
      class: '1st Class',
      totalFare: '400 LKR',
    };
    setTicketData(dataFromServer);
  };

  const handlePrintTicket = () => {
    // Implement print logic
    window.print();
  };

  const handleDownloadTicket = () => {
    // Implement download logic
    const ticketData = JSON.stringify(ticketData);
    const blob = new Blob([ticketData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.json';
    a.click();
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Left Card */}
      <Card style={{ flex: 1, padding: '20px', marginRight: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Ticket Purchasing
        </Typography>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div
  onClick={() => handleTabChange('oneWay')}
  style={{
    width: '50%',
    backgroundColor: selectedTab === 'oneWay' ? '#3D51A9' : '#ccc',
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: '2.5', // Adjust the line height to vertically center the text
  }}
>
  One Way
</div>
<div
  onClick={() => handleTabChange('roundTrip')}
  style={{
    width: '50%',
    backgroundColor: selectedTab === 'roundTrip' ? '#3D51A9' : '#ccc',
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: '2.5', // Adjust the line height to vertically center the text
  }}
>
  Round Trip
</div>

        </div>
        <TextField label="From" fullWidth variant="outlined" margin="normal" />
        <TextField label="To" fullWidth variant="outlined" margin="normal" />
        <Typography variant="body2" gutterBottom>
          Departure Date
        </Typography>
        <TextField type="date" fullWidth variant="outlined" margin="normal" />
        <Typography variant="body2" gutterBottom>
          Return Date
        </Typography>
        <TextField
          type="date"
          fullWidth
          variant="outlined"
          margin="normal"
          disabled={selectedTab === 'oneWay'}
        />
        <TextField label="No of passengers" type="number" fullWidth variant="outlined" margin="normal" />
        <TextField
          label="Class"
          select
          fullWidth
          variant="outlined"
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="1st">1st Class</option>
          <option value="2nd">2nd Class</option>
          <option value="3rd">3rd Class</option>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleQuickTicket} style={{ marginTop: '20px', width: '100%' }}>
          Quick Ticket
        </Button>
      </Card>

      {/* Right Card */}
      <Card style={{ flex: 1, padding: '20px' }}>
        {ticketData ? (
          <>
            <Typography variant="h6" gutterBottom>
              Ticket Details
            </Typography><br></br>
            <Typography variant="body1" gutterBottom>
              Ticket ID: {ticketData.ticketId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Start Station: {ticketData.startStation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              End Station: {ticketData.endStation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Departure Date: {ticketData.departureDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Arrival Date: {ticketData.arrivalDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Passengers: {ticketData.passengers}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Class: {ticketData.class}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Fare: {ticketData.totalFare}
            </Typography>
            <img
              src={QRimage}
              alt="QR Code"
              style={{ marginTop: '20px', maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', alignContent:'center' ,marginLeft:'150px'}}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="primary" onClick={handlePrintTicket}>
                Print Ticket
              </Button>
              <Button variant="contained" color="primary" onClick={handleDownloadTicket}>
                Download Ticket
              </Button>
            </div>
          </>
        ) : (
          <img
            src={cardImage}
            alt="Placeholder"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' , marginTop:'50px'}}
          />
        )}
      </Card>
    </Container>
  );
};

export default TicketPurchase;
