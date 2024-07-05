import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapView = ({ locations }) => {
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      style={{ height: '600px', width: '100%' }}
      center={[48.8566, 2.3522]}
      zoom={6}
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
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
