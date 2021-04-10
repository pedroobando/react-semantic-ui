import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

export const TestMap = ({ locations, setLatLng }) => {
  const { address, latLng } = locations;

  if (latLng.lat === 0 && latLng.lng === 0) return <div></div>;

  const LocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        if (typeof setLatLng === 'function')
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
