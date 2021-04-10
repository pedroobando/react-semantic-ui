import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { TestMap } from './TestMap';
import { decrement, increment } from './testRedux';

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

const initialStateZona = {
  city: {
    address: '',
    latlng: {
      lat: 0,
      lng: 0,
    },
  },
};
const Sandbox = () => {
  const dispatch = useDispatch();
  const [zona, setZona] = useState(initialStateZona);
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const [mapLocation, setMapLocation] = useState(initialStateMapLocation);

  const onSelectClick = (event) => {
    setMapLocation((point) => ({ ...point, latLng: event.latlng }));
    setZona((point) => ({ ...point, city: { ...event } }));
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

      <label name="coord">{JSON.stringify(mapLocation.latLng)}</label>
      <br />
      <code>{JSON.stringify(zona)}</code>

      <TestPlaceInput
        name="address"
        address="Barcelona, Barcelonés, Barcelona, Cataluña, 08001, España"
        placeholder="Search Address or City"
        onSelect={onSelectClick}
      />

      <Segment style={{ width: '100%', height: '500px', marginTop: '20px' }}>
        <TestMap locations={mapLocation} setLatLng={setMapLocation} />
      </Segment>
    </>
  );
};

export default Sandbox;
