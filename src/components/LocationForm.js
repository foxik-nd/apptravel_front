import React, { useState } from 'react';

const LocationForm = ({ onAddLocation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (latitude.trim() === '' || longitude.trim() === '') return;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert('Veuillez entrer des valeurs numériques valides pour la latitude et la longitude.');
      return;
    }

    const locationData = { latitude: lat, longitude: lon };
    console.log('Sending data:', locationData);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error('Failed to add location');
      }

      const location = await response.json();
      console.log('Received response:', location);
      onAddLocation(location);
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={latitude}
        onChange={handleLatitudeChange}
        placeholder="Entrez la latitude"
      />
      <input
        type="text"
        value={longitude}
        onChange={handleLongitudeChange}
        placeholder="Entrez la longitude"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default LocationForm;
