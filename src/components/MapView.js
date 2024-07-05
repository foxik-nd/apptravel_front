import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapView = ({ locations, onDeleteLocation }) => {
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleDelete = (locationId) => {
    onDeleteLocation(locationId);
  };

  return (
    <MapContainer
      style={{ height: '500px', width: '100%' }}
      center={[48.8566, 2.3522]}
      zoom={8}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              {location.image && <img src={location.image} alt="Location" style={{ width: '100px', height: '100px' }} />}
              {location.description && <p>Description: {location.description}</p>}
              <button onClick={() => handleDelete(location._id)}>Supprimer</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
