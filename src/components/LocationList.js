import React, { useEffect, useState } from 'react';

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`);
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error retrieving locations:', error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map((location) => (
          <li key={location._id}>
            Latitude: {location.latitude}, Longitude: {location.longitude}, Timestamp: {new Date(location.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
