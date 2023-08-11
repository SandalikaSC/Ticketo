import React from 'react';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';

const MapContainer = (props) => {
  const pathCoordinates = [
    { lat: 6.053519, lng: 80.220978 }, 
    { lat: 6.139468, lng: 80.106285 }, 
    { lat: 6.2217, lng: 80.0540 },  
    { lat: 6.9237, lng: 79.8585 },
  ];

  return (
    <Map
      google={props.google}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      initialCenter={{ lat: 6.9271, lng: 79.8612 }} // Initial center point
      zoom={10} // Initial zoom level
    >
      <Polyline
        path={pathCoordinates}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCayfe5rzCzRtSRad2wjuByc8-KhjPDu8Y'
})(MapContainer);
