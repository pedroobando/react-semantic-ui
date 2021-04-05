import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Segment } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { TestMap } from './TestMap';
import { decrement, increment } from './testRedux';

import { OpenStreetMapProvider } from 'leaflet-geosearch';
import TestPlaceInput from './TestPlaceInput';

const initialStateMapLocation = {
  address: '',
  latLng: {
    lat: 0,
    lng: 0,
  },
  zoom: 15,
  scrollZoom: true,
};

const provider = new OpenStreetMapProvider();

const Sandbox = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const [mapLocation, setMapLocation] = useState(initialStateMapLocation);

  // useEffect(async () => {
  //   const streeSearch = mapLocation.address.trim();
  //   if (streeSearch.length >= 3) {
  //     const srcLocation = await provider.search({ query: mapLocation.address.trim() });
  //     if (srcLocation.length >= 1)
  //       setMapLocation((valueMap) => ({
  //         ...valueMap,
  //         latLng: { lat: srcLocation[0].y, lng: srcLocation[0].x },
  //       }));
  //   }
  // }, [mapLocation.address]);

  const handleChangeMapLocation = ({ target }) => {
    setMapLocation((valueMap) => ({ ...valueMap, [target.name]: target.value }));
  };

  const handleSearchAddress = async () => {
    const streeSearch = mapLocation.address.trim();
    if (streeSearch.length >= 3) {
      const srcLocation = await provider.search({ query: mapLocation.address.trim() });
      if (srcLocation.length >= 1)
        setMapLocation((valueMap) => ({
          ...valueMap,
          latLng: { lat: srcLocation[0].y, lng: srcLocation[0].x },
        }));
    }
  };

  const onSelectClick = (event) => {
    // console.log(event);
    setMapLocation((point) => ({ ...point, latLng: event.latlng }));
  };

  return (
    <>
      <h1>Testing 123</h1>
      <h2>The data is: {data}</h2>
      <Button
        name="increment"
        loading={loading && target === 'increment'}
        onClick={(e) => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
        content="Increment"
        color="green"
      />
      <Button
        name="decrement"
        loading={loading && target === 'decrement'}
        onClick={(e) => {
          dispatch(decrement(20));
          setTarget(e.target.name);
        }}
        content="Decrement"
        color="red"
      />
      <Button
        onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))}
        content="Open Modal"
        color="teal"
      />
      <hr />
      <Input
        placeholder="indique el lugar"
        name="address"
        value={mapLocation.address}
        onChange={handleChangeMapLocation}
        style={{ width: '300px' }}
      />

      <Button color="violet" onClick={handleSearchAddress} style={{ margin: '0px 5px' }}>
        Buscar
      </Button>

      <label name="coord">{JSON.stringify(mapLocation.latLng)}</label>

      <TestPlaceInput onSelect={onSelectClick} placeholder="Search Address or City" />

      <Segment style={{ width: '100%', height: '500px', marginTop: '20px' }}>
        <TestMap defaultProps={mapLocation} setLatLng={setMapLocation} />
      </Segment>
    </>
  );
};

export default Sandbox;
