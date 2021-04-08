import React, { useEffect, useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { FormField, List, Segment, Label } from 'semantic-ui-react';
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

const MyPlaceInput = ({ onSelect, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const fieldName = useRef(undefined);
  const [mapLocation, setMapLocation] = useState(initialState);
  const [addressList, setAddressList] = useState(initialStateList);

  useEffect(() => {
    const { address } = props;
    console.log(field.value['address']);
    // setFieldValue(field.name, address);
    setMapLocation((locat) => ({ ...locat, address }));
  }, []);

  // const handleChangeAddress = ({ target }) => {
  //   setMapLocation((valueMap) => ({ ...valueMap, address: target.value }));
  //   fieldName.current = [target.name][0];
  // };

  const handleSearchAddress = async () => {
    const streeSearch = field.value.trim();
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
      <FormField error={meta.touched && !!meta.error}>
        <div className="ui icon input" style={{ width: '100%' }}>
          <input
            {...field}
            // value={field.value['address']}
            onChange={(value) => helpers.setValue({ address: value })}
          />
          <i
            className="cancel link icon"
            onClick={() => {
              setMapLocation(initialState);
              setAddressList(initialStateList);
            }}></i>
          <i
            className="circular search link icon"
            style={{ marginRight: '30px' }}
            onClick={handleSearchAddress}></i>
        </div>
        {meta.touched && meta.error ? (
          <Label basic color="red">
            {meta.error}
          </Label>
        ) : null}

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
                    helpers.setValue({
                      address: place.address,
                      latlng: {
                        lat: place.latlng.lat,
                        lng: place.latlng.lng,
                      },
                    });
                    // setFieldValue(field.name, place.address);
                    onSelect(place, fieldName.current);
                  }}
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
