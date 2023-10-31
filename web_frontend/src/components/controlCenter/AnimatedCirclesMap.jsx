import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Circle } from "google-maps-react";
import axios from "axios";

const TrackingMapWithAnimation = (props) => {
  const [locationUpdates, setlocationUpdates] = useState([]);
  const center = { lat: 6.2259, lng: 80.1162 }; // Center point
  const zoom = 10; // Initial zoom level

  const points = [
    { lat: 6.053519, lng: 80.220978 },
    { lat: 6.139468, lng: 80.106285 },
    { lat: 6.2217, lng: 80.054 },
    { lat: 6.9237, lng: 79.8585 },
  ];

  const [animationCircles, setAnimationCircles] = useState(
    points.map((point) => ({
      point,
      radius: 1000,
      fillOpacity: 0.5,
    }))
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newCircles = animationCircles.map((circle) => ({
  //       ...circle,
  //       radius: circle.radius + 1000,
  //       fillOpacity: circle.fillOpacity - 0.05,
  //     }));
  //     setAnimationCircles(newCircles);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    // Function to fetch updates and update state
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get-all-updates"
        );
        //console.log("Response:", response.data);
        setlocationUpdates(response.data.notifications);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();

    // Set up an interval to fetch updates every 5 seconds
    const interval = setInterval(fetchUpdates, 5000);

    // Update animationCircles with an animation effect
    // const animationInterval = setInterval(() => {
    //   const newCircles = animationCircles.map((circle) => ({
    //     ...circle,
    //     radius: circle.radius + 1000,
    //     fillOpacity: circle.fillOpacity - 0.05,
    //   }));
    //   setAnimationCircles(newCircles);
    // }, 1000);

    // Clear both intervals when the component unmounts
    return () => {
      clearInterval(interval);
      //clearInterval(animationInterval);
    };
  }, []);

  return (
    <Map
      google={props.google}
      style={{ width: "100%", height: "100%", position: "relative" }}
      initialCenter={center}
      zoom={zoom}
    >
      {animationCircles.map((circle, index) => (
        <Circle
          key={index}
          center={circle.point}
          radius={circle.radius}
          options={{
            strokeColor: "#ffffff", // White border color
            strokeOpacity: 1, // Fully opaque
            strokeWeight: 2,
            fillColor: "#1976d2",
            fillOpacity: circle.fillOpacity,
            clickable: false,
            zIndex: -1,
            animation: window.google.maps.Animation.DROP,
            // Adding shadow
            shadowColor: "#000000", // Shadow color
            shadowOpacity: 0.6, // Shadow opacity
            shadowRadius: 10, // Shadow radius
            shadowOffset: { width: 0, height: 0 }, // Shadow offset
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCayfe5rzCzRtSRad2wjuByc8-KhjPDu8Y", // Replace with your API key
})(TrackingMapWithAnimation);
