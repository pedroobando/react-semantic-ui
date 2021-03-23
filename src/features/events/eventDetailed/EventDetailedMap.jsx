import React, { useRef } from 'react';
import { Segment } from 'semantic-ui-react';
import { TestMap } from '../../sandox/TestMap';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 15,
  scrollZoom: true,
};

const provider = new OpenStreetMapProvider();
// provider.search({ query: 'Kansas City, West 11th Street' }).then((retorno) =>
//   setMapProps({
//     center: { lat: retorno[0].y, lng: retorno[0].x },
//     zoom: 10,
//     scrollZoom: true,
//   })
// );

export const EventDetailedMap = ({ eventLocation, lat = 0, lng = 0 }) => {
  const coordRef = useRef();
  // console.log(latLng);

  const cordenadas = provider.search({ query: eventLocation });

  // console.log(cordenadas);
  const pepe = cordenadas.then((result) => {
    console.log(result);
    coordRef.current = result[0];
    return (defaultProps = {
      center: { lat: result[0].y, lng: result[0].x },
      zoom: 15,
      scrollZoom: false,
    });

    // console.log(result[0].x, result[0].y);
  });
  // const sss = coordRef.current;
  // console.log(sss, coordRef.current);
  // let defaultProps = {
  //   center: { lat, lng },
  //   zoom: 15,
  //   scrollZoom: false,
  // };
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ width: '100%', height: '400px' }}>
        <TestMap defaultProps={defaultProps} />
      </div>
    </Segment>
  );
};
