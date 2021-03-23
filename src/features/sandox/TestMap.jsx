import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const TestMap = ({ defaultProps }) => {
  // const { latitude, longitude } = position;
  const { center, zoom, scrollZoom } = defaultProps;
  if (center.lat === 0 && center.lng === 0) return <div></div>;
  // console.log(center);
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollZoom}
      style={{ width: '100%', height: '100%', zIndex: 2 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
