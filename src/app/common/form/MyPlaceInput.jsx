import React, { useState } from 'react';
import { useField } from 'formik';
import { FormField, List, Segment, Label } from 'semantic-ui-react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const initialStateList = [];
const provider = new OpenStreetMapProvider();

const MyPlaceInput = ({ ...props }) => {
  const { onSelect } = props;
  const [field, meta, helpers] = useField(props);
  const [addressList, setAddressList] = useState(initialStateList);

  const handleChangeAddress = ({ target }) => {
    // setMapLocation((valueMap) => ({ ...valueMap, address: target.value }));
    helpers.setValue({ address: target.value });
  };

  const handleSearchAddress = async () => {
    const streeSearch = field.value['address'];
    if (streeSearch.length >= 3) {
      const srcLocation = await provider.search({ query: streeSearch });
      if (srcLocation.length >= 1) {
        setAddressList(
          srcLocation.map((point) => ({
            address: point.label,
            latlng: { lat: point.y, lng: point.x },
          }))
        );
      }
    }
  };

  const handleSelectPlace = (place) => {
    setAddressList(initialStateList);
    helpers.setValue({
      address: place.address,
      latLng: {
        lat: place.latlng.lat,
        lng: place.latlng.lng,
      },
    });
    if (typeof onSelect === 'function') onSelect({ fieldName: field.name, ...place });
  };

  return (
    <>
      <FormField error={meta.touched && !!meta.error}>
        <div className="ui icon input" style={{ width: '100%' }}>
          <input {...field} value={field.value['address']} onChange={handleChangeAddress} />
          <i className="circular search link icon" onClick={handleSearchAddress}></i>
        </div>
        {meta.touched && meta.error ? (
          <Label basic color="red" content={meta.error['address']} />
        ) : null}

        {addressList.length > 0 && (
          <Segment style={{ margin: '0px auto', padding: '5px 10px' }}>
            <List selection>
              {addressList.map((place, indk) => (
                <List.Item
                  key={indk}
                  icon="point"
                  content={place.address}
                  onClick={() => handleSelectPlace(place)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </List>
          </Segment>
        )}
      </FormField>
    </>
  );
};

export default MyPlaceInput;
