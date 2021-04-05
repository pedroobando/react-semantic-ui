import React, { useState } from 'react';
import { useField } from 'formik';
import { FormField, Label, Segment, List } from 'semantic-ui-react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const initialState = {
  address: '',
  latlng: {
    lat: 0,
    lng: 0,
  },
};

const initialStateList = [];
const provider = new OpenStreetMapProvider();

const MyPlaceInput = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [mapLocation, setMapLocation] = useState(initialState);
  const [addressList, setAddressList] = useState(initialStateList);

  const handleSearchAddress = async () => {
    const streeSearch = field.value.trim();

    if (streeSearch.length >= 3) {
      const srcLocation = await provider.search({ query: streeSearch });
      if (srcLocation.length > 0) {
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
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      {/* <input {...field} {...props} /> */}
      <span className="ui icon input" style={{ width: '100%' }}>
        <input {...field} {...props} />

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
      </span>

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}

      {addressList?.length > 0 && (
        <Segment style={{ margin: '0px auto', padding: '5px 10px', zindex: 1000 }}>
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
                  helpers.setValue({ address: place.address, latLng: place.latlng });
                  // onSelect(place);
                }}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </List>
        </Segment>
      )}
    </FormField>
  );
};

export default MyPlaceInput;
