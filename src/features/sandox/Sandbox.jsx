import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Segment } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { TestMap } from './TestMap';
import { decrement, increment } from './testRedux';

import { OpenStreetMapProvider } from 'leaflet-geosearch';

const defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 15,
  scrollZoom: true,
};

const Sandbox = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);
  const [mapProps, setMapProps] = useState(defaultProps);

  const provider = new OpenStreetMapProvider();
  provider.search({ query: 'Kansas City, West 11th Street' }).then((retorno) =>
    setMapProps({
      center: { lat: retorno[0].y, lng: retorno[0].x },
      zoom: 10,
      scrollZoom: true,
    })
  );

  // results.then((resul) => {
  //   // console.log(resul[0]);
  //   setMapProps({
  //     center: { lat: resul[0].y, lng: resul[0].x },
  //     zoom: 15,
  //     scrollZoom: true,
  //   });
  // });
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

      <Segment style={{ width: '80%', height: '500px', marginTop: '20px' }}>
        <TestMap defaultProps={mapProps} />
      </Segment>
    </>
  );
};

export default Sandbox;
