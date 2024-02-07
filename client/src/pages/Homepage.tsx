import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { config } from '../config';



const Homepage = () => {
  const hunterLocation = {lat: 40.76785648078654, lng: -73.96447914218824};

  return(
    <APIProvider apiKey={config.mapsAPIKey}>
      <div className='w-3/4 h-full p-11'>
        <Map zoom={15}
            center={hunterLocation}
            mapId={config.mapID}>

          <Marker position={hunterLocation} />
        </Map>
      </div>

    </APIProvider>
  );

};

export default Homepage;