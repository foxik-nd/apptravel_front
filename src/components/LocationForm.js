import React, { useState } from 'react';

const LocationForm = ({ onAddLocation }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState(null);

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
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

    const location = { latitude: lat, longitude: lon, image };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });

      if (!response.ok) {
        throw new Error('Failed to add location');
      }

      const addedLocation = await response.json();
      onAddLocation(addedLocation);
      setLatitude('');
      setLongitude('');
      setImage(null);
    } catch (error) {
      console.error(error);
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
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default LocationForm;
