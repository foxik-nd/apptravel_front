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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude.trim() === '' || longitude.trim() === '') return;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert('Veuillez entrer des valeurs numériques valides pour la latitude et la longitude.');
      return;
    }

    onAddLocation({ latitude: lat, longitude: lon });
    setLatitude('');
    setLongitude('');
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
