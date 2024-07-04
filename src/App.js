import React, { useEffect, useState } from 'react';
import LocationForm from './components/LocationForm';
import LocationList from './components/LocationList';
import MapView from './components/MapView';
import 'leaflet/dist/leaflet.css';

function App() {
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
    <div className="App">
      <h1>TRAVEL APP</h1>
      <LocationForm />
      <LocationList />
      <MapView locations={locations} />
    </div>
  );
}

export default App;
