import React, { useState, useEffect } from 'react';
import { Container, Card, Typography, TextField, Button, MenuItem } from '@mui/material';
import QRimage from '../../assets/qr.png';
import cardImage from '../../assets/tarin-image.png';
import axios from 'axios';

const TicketPurchase = () => {
  const [ticketData, setTicketData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('oneWay');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [stations, setStations] = useState([]);

  const [formErrors, setFormErrors] = useState({
    fromStation: false,
    toStation: false,
    departureDate: false,
    returnDate: false,
    passengers: false,
  });

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allStations");
      setStations(response.data.stations);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleQuickTicket = () => {
    const errors = {};

    if (fromStation === '') errors.fromStation = true;
    if (toStation === '') errors.toStation = true;
    if (departureDate === '') errors.departureDate = true;
    if (selectedTab === 'roundTrip' && returnDate === '') errors.returnDate = true;
    if (passengers === '') errors.passengers = true;

    if (selectedTab === 'roundTrip' && returnDate < departureDate) {
      errors.returnDate = true;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const dataFromUser = {
      startStation: fromStation,
      endStation: toStation,
      departureDate: departureDate,
      returnDate: selectedTab === 'roundTrip' ? returnDate : '',
      passengers: passengers,
      class: '1st Class',
    };
    setTicketData(dataFromUser);
  };

  const handlePrintTicket = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(document.getElementById('right-card').innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadTicket = () => {
    if (!ticketData) {
      return;
    }

    const ticketDataString = JSON.stringify(ticketData);
    const blob = new Blob([ticketDataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.jpg';
    a.click();
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <Card style={{ flex: 1, padding: '20px', marginRight: '20px' }}>
        <Typography variant="h6" gutterBottom>
          <b>Ticket Purchasing</b>
        </Typography>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div
            onClick={() => handleTabChange('oneWay')}
            style={{
              width: '50%',
              backgroundColor: selectedTab === 'oneWay' ? '#3D51A9' : '#DCDCDC',
              textAlign: 'center',
              cursor: 'pointer',
              lineHeight: '2.5',
            }}
          >
            One Way
          </div>
          <div
            onClick={() => handleTabChange('roundTrip')}
            style={{
              width: '50%',
              backgroundColor: selectedTab === 'roundTrip' ? '#3D51A9' : '#DCDCDC',
              textAlign: 'center',
              cursor: 'pointer',
              lineHeight: '2.5',
            }}
          >
            Round Trip
          </div>
        </div>
        <TextField
          label="From"
          fullWidth
          variant="outlined"
          margin="normal"
          error={formErrors.fromStation}
          helperText={formErrors.fromStation ? 'From station is required' : ''}
          value={fromStation}
          onChange={(e) => {
            setFromStation(e.target.value);
            setFormErrors({ ...formErrors, fromStation: false });
          }}
          select
        >
          {stations.map(station => (
            <MenuItem key={station.stationId} value={station.name}>
              {station.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="To"
          fullWidth
          variant="outlined"
          margin="normal"
          error={formErrors.toStation}
          helperText={formErrors.toStation ? 'To station is required' : ''}
          value={toStation}
          onChange={(e) => {
            setToStation(e.target.value);
            setFormErrors({ ...formErrors, toStation: false });
          }}
          select
        >
          {stations.map(station => (
            <MenuItem key={station.stationId} value={station.name}>
              {station.name}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="body2" gutterBottom>
          Departure Date
        </Typography>
        <TextField
          type="date"
          fullWidth
          variant="outlined"
          margin="normal"
          error={formErrors.departureDate}
          helperText={formErrors.departureDate ? 'Departure date is required' : ''}
          value={departureDate}
          onChange={(e) => {
            setDepartureDate(e.target.value);
            setFormErrors({ ...formErrors, departureDate: false });
          }}
        />
        {selectedTab === 'roundTrip' && (
          <>
            <Typography variant="body2" gutterBottom>
              Return Date
            </Typography>
            <TextField
              type="date"
              fullWidth
              variant="outlined"
              margin="normal"
              error={formErrors.returnDate}
              helperText={
                formErrors.returnDate
                  ? 'Return date is required'
                  : returnDate < departureDate
                  ? 'Return date must be after departure date'
                  : ''
              }
              value={returnDate}
              onChange={(e) => {
                setReturnDate(e.target.value);
                setFormErrors({ ...formErrors, returnDate: false });
              }}
            />
          </>
        )}
        <TextField
          label="No of passengers"
          type="number"
          fullWidth
          variant="outlined"
          margin="normal"
          error={formErrors.passengers}
          helperText={formErrors.passengers ? 'Number of passengers is required' : ''}
          value={passengers}
          onChange={(e) => {
            setPassengers(e.target.value);
            setFormErrors({ ...formErrors, passengers: false });
          }}
        />
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleQuickTicket}
          style={{ marginTop: '20px', width: '100%', backgroundColor:'#3D51A9' }}
        >
          Quick Ticket
        </Button>
      </Card>

      <Card id="right-card" style={{ flex: 1, padding: '20px' }}>
        {ticketData ? (
          <>
            <Typography variant="h6" gutterBottom>
              Ticket Details
            </Typography>
            <br />
            <Typography variant="body1" gutterBottom>
              Start Station: {ticketData.startStation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              End Station: {ticketData.endStation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Departure Date: {ticketData.departureDate}
            </Typography>
            {selectedTab === 'roundTrip' && (
              <Typography variant="body1" gutterBottom>
                Return Date: {ticketData.returnDate}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              Passengers: {ticketData.passengers}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Class: {ticketData.class}
            </Typography>
            <img
              src={QRimage}
              alt="QR Code"
              style={{ marginTop: '20px', maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', alignContent: 'center', marginLeft: '150px' }}
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
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', marginTop: '50px' }}
          />
        )}
      </Card>
    </Container>
  );
};

export default TicketPurchase;
