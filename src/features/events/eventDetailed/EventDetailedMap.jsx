import React, { useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { TestMap } from '../../sandox/TestMap';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

// const defaultProps = {
//   center: { lat: 0, lng: 0 },
//   zoom: 15,
//   scrollZoom: true,
// };

// const provider = new OpenStreetMapProvider();

export const EventDetailedMap = ({ eventLocation }) => {
  // const [deftProps, setDeftProps] = useState(defaultProps);
  const { latLng, address } = eventLocation;

  const defaultProps = {
    center: latLng,
    zoom: 15,
    scrollZoom: true,
  };
  // console.log(latLng, address);

  // setDeftProps({ ...deftProps, center: latLng });

  // const cordenadas = provider.search({ query: eventLocation });

  // cordenadas.then((result) => {
  //   if (result.length >= 1)
  //     setDeftProps({
  //       center: { lat: result[0].y, lng: result[0].x },
  //       zoom: 15,
  //       scrollZoom: false,
  //     });
  // });
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ width: '100%', height: '400px' }}>
        <TestMap defaultProps={defaultProps} />
      </div>
    </Segment>
  );
};
