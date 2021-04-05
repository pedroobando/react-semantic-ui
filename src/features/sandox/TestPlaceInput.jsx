import React, { useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { List, Segment } from 'semantic-ui-react';

const initialState = {
  address: '',
  latlng: {
    lat: 0,
    lng: 0,
  },
};

const initialStateList = [];
const provider = new OpenStreetMapProvider();

const TestPlaceInput = ({ onSelect, placeholder = 'search address' }) => {
  const [mapLocation, setMapLocation] = useState(initialState);
  const [addressList, setAddressList] = useState(initialStateList);

  const handleChangeAddress = ({ target }) => {
    setMapLocation((valueMap) => ({ ...valueMap, [target.name]: target.value }));
  };

  const handleSearchAddress = async () => {
    const streeSearch = mapLocation.address.trim();
    if (streeSearch.length >= 3) {
      const srcLocation = await provider.search({ query: mapLocation.address.trim() });
      if (srcLocation.length >= 1) {
        setAddressList(
          srcLocation.map((point, ind) => ({
            key: ind,
            address: point.label,
            latlng: { lat: point.y, lng: point.x },
          }))
        );
      }
    }
  };

  const visibleList = () => {
    if (addressList.length >= 1) return 'block';
    else return 'none';
  };

  return (
    <>
      <div className="ui icon input" style={{ width: '100%' }}>
        <i
          className="cancel link icon "
          onClick={() => {
            setMapLocation(initialState);
            setAddressList(initialStateList);
          }}></i>
        <input
          name="address"
          value={mapLocation.address}
          type="text"
          placeholder={placeholder}
          onChange={handleChangeAddress}
        />

        <i
          className="circular search link icon"
          style={{ marginRight: '30px' }}
          onClick={handleSearchAddress}></i>
      </div>
      <Segment style={{ margin: '0px auto', padding: '5px 10px', display: visibleList() }}>
        <List>
          {addressList.map((place, indk) => (
            <List.Item
              key={indk}
              icon="point"
              content={place.address}
              onClick={() => {
                setMapLocation({
                  address: place.address,
                  latlng: {
                    lat: place.latlng.lat,
                    lng: place.latlng.lng,
                  },
                });
                setAddressList(initialStateList);
                onSelect(place);
              }}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </List>
      </Segment>
    </>
  );
};

export default TestPlaceInput;
