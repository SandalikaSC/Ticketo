import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Circle, Marker } from "google-maps-react";
import axios from "axios";

const TrackingMapWithAnimation = (props) => {
  const [locationUpdates, setlocationUpdates] = useState([]);
  const center = { lat: 6.2259, lng: 80.1162 }; // Center point
  const zoom = 10; // Initial zoom level

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get-all-updates"
        );
        console.log("Response:", response.data);
        setlocationUpdates(response.data.scheduleupdates);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();

    const interval = setInterval(fetchUpdates, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Map
      google={props.google}
      style={{ width: "100%", height: "100%", position: "relative" }}
      initialCenter={center}
      zoom={zoom}
    >
      {locationUpdates.map((update, index) => (
        <Marker
          key={index}
          position={{ lat: update.latitude, lng: update.longitude }}
          label={update.name}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCayfe5rzCzRtSRad2wjuByc8-KhjPDu8Y",
})(TrackingMapWithAnimation);
