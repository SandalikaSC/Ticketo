import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Circle } from 'google-maps-react';

const TrackingMap = (props) => {
  const center = { lat: 6.2259, lng: 80.1162 }; // Center point
  const zoom = 10; // Initial zoom level

  const points = [
    { lat: 6.053519, lng: 80.220978 },
    { lat: 6.139468, lng: 80.106285 },
    { lat: 6.2217, lng: 80.054 },
    { lat: 6.9237, lng: 79.8585 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Create new circles with increasing radii and decreasing opacity
      const newCircles = animationCircles.map((circle) => ({
        ...circle,
        radius: circle.radius + 1000,
        fillOpacity: circle.fillOpacity - 0.05,
      }));
      setAnimationCircles(newCircles);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const [animationCircles, setAnimationCircles] = useState(
    points.map((point) => ({
      point,
      radius: 1000,
      fillOpacity: 0.5,
    }))
  );

  return (
    <Map
      google={props.google}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      initialCenter={center}
      zoom={zoom}
    >
      {animationCircles.map((circle, index) => (
        <Circle
          key={index}
          center={circle.point}
          radius={circle.radius}
          options={{
            strokeColor: '#1976d2',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1976d2',
            fillOpacity: circle.fillOpacity,
            clickable: false,
            zIndex: -1,
            animation: window.google.maps.Animation.DROP, // Add animation
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCayfe5rzCzRtSRad2wjuByc8-KhjPDu8Y', // Replace with your API key
})(TrackingMap);
