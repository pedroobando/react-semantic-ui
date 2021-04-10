import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

export const TestMap = ({ defaultProps, setLatLng }) => {
  const { address, latLng } = defaultProps;

  if (latLng.lat === -999 && latLng.lng === -999) return <div></div>;

  const LocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        setLatLng((locMap) => ({ ...locMap, latLng: e.latlng }));
      },
    });

    useEffect(() => {
      map.flyTo(latLng, map.getZoom());
    }, [latLng]);

    return latLng === null ? null : (
      <Marker position={latLng}>
        <Popup>{address}</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      center={latLng}
      zoom={5}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', zIndex: 2 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};
