import React, { useEffect, useState } from 'react';
import LocationForm from './components/LocationForm';
// import LocationList from './components/LocationList';
import MapView from './components/MapView';
import 'leaflet/dist/leaflet.css';
import './App.css';

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

  const addLocation = (location) => {
    setLocations((prevLocations) => [...prevLocations, location]);
  };

  const deleteLocation = async (locationId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${locationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete location');
      }
      setLocations((prevLocations) => prevLocations.filter(loc => loc._id !== locationId));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div className="App">
      <h1>TRAVEL APP</h1>
      <LocationForm onAddLocation={addLocation} />
      <MapView locations={locations} onDeleteLocation={deleteLocation} />
    </div>
  );
}

export default App;
