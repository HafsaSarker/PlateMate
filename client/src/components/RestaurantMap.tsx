import React ,  { useEffect, useState, useCallback, useRef  }from 'react';
import { APIProvider, AdvancedMarker, Map, Marker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { config } from '../config';
import {debounce} from 'lodash';

interface RestaurantMapProps {
  setClickedRestaurant: (restaurant: string) => void;
}

const RestaurantMap = ({setClickedRestaurant}) => {
  const [restaurants, setRestaurants] = useState([]);

  // hard coded for now
  const currentLocation = { lat: 40.76785648078654, lng: -73.96447914218824 };
  const price = 1;

  const [mapCenter, setMapCenter] = useState(currentLocation);
  const mapCenterRef = useRef(mapCenter); // this is so the debounced function can access the latest mapCenter

  useEffect(() => {
    mapCenterRef.current = mapCenter; // Update ref on mapCenter change
  }, [mapCenter]);

  const fetchRestaurants = async () => {
    const { lat, lng } = mapCenterRef.current;
    try {
      const response = await fetch(`/api/v3/businesses/search?term=restaurants` +
      `&latitude=${lat}`+
      `&longitude=${lng}`+
      `&radius=1500`+
      `&sort_by=distance`+
      `&limit=50`+
      `&price=${price}`,
        {
          method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      setRestaurants(data.businesses);
      console.log(data.businesses)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // debounced api call so we don't make a request on every map move
  const debouncedFetchRestaurants = useCallback(debounce(() => {
    fetchRestaurants();
  }, 1000), []);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Call debouncedFetchRestaurants on mapCenter change
  useEffect(() => {
    debouncedFetchRestaurants(mapCenter);
  }, [mapCenter, debouncedFetchRestaurants]);

  // Function to handle marker click
  const handleMarkerClick = (restaurant) => {
    setClickedRestaurant(restaurant);
  };


  const updateMap = (map) => {
    console.log(map)
    const center = map.detail.center;
    setMapCenter(center);
    console.log('center:   ',center)
  }

  return (
    <APIProvider apiKey={config.mapsAPIKey}>
      <div className='w-full h-full'>
        <Map
          zoom={17}
          center={mapCenter}
          mapId={config.mapID}
          onCenterChanged={(map) => updateMap(map)}
        >
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={{lat:restaurant.coordinates.latitude, lng:restaurant.coordinates.longitude}}
              onClick={() => handleMarkerClick(restaurant)}
            />
          ))}
          <AdvancedMarker position={currentLocation}>
            <Pin background={'blue'} borderColor={'blue'} glyphColor={'lightblue'} scale={2}/>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default RestaurantMap;
