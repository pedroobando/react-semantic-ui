import React, { useEffect, useState } from 'react';
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

const TestPlaceInput = ({ onSelect, ...props }) => {
  const [mapLocation, setMapLocation] = useState(initialState);
  const [addressList, setAddressList] = useState(initialStateList);

  useEffect(() => {
    const { address } = props;
    setMapLocation((locat) => ({ ...locat, address }));
  }, []);

  const handleChangeAddress = ({ target }) => {
    // setMapLocation((valueMap) => ({ ...valueMap, [target.name]: target.value }));
    setMapLocation((valueMap) => ({ ...valueMap, address: target.value }));
    // console.log([target.name], target.value);
  };

  const handleSearchAddress = async () => {
    const streeSearch = mapLocation.address.trim();
    // console.log(streeSearch);
    if (streeSearch.length >= 3) {
      const srcLocation = await provider.search({ query: streeSearch });
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

  return (
    <>
      <div className="ui icon input" style={{ width: '100%' }}>
        <input
          type="text"
          text="address"
          value={mapLocation.address}
          onChange={handleChangeAddress}
          {...props}
        />

        <i
          className="cancel link icon "
          onClick={() => {
            setMapLocation(initialState);
            setAddressList(initialStateList);
          }}></i>
        <i
          className="circular search link icon"
          style={{ marginRight: '30px' }}
          onClick={handleSearchAddress}></i>
      </div>
      {addressList.length > 0 && (
        <Segment style={{ margin: '0px auto', padding: '5px 10px' }}>
          <List selection>
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
      )}
    </>
  );
};

export default TestPlaceInput;
