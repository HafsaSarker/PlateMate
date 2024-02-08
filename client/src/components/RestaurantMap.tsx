import React ,  { useEffect, useState }from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, AdvancedMarker, Map, Marker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { config } from '../config';

const RestaurantMap = () => {
  const [restaurants, setRestaurants] = useState([]);
  const currentLocation = { lat: 40.76785648078654, lng: -73.96447914218824 };

  const yelpAPIKey = config.yelpAPIKey;

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`/api/v3/businesses/search?term=restaurants` +
      `&latitude=${currentLocation.lat}`+
      `&longitude=${currentLocation.lng}`+
      `&radius=500`+
      `&sort_by=distance`+
      `&limit=50`,
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

  useEffect(() => {
    fetchRestaurants();
  }, []);
  // Function to handle marker click
  const handleMarkerClick = (restaurantName) => {
    console.log(restaurantName);
  };

  return (
    <APIProvider apiKey={config.mapsAPIKey}>
      <div className='w-3/4 h-full p-11'>
        <Map zoom={17} center={currentLocation} mapId={config.mapID}>
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={{lat:restaurant.coordinates.latitude, lng:restaurant.coordinates.longitude}}
              onClick={() => handleMarkerClick(restaurant.name)}
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
