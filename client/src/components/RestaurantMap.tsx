import React ,  { useEffect, useState }from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { config } from '../config';

const RestaurantMarkers = ({location, setRestaurants}) => {
  const map = useMap();

  console.log(map)
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLib) return;

    const service  = new placesLib.PlacesService(map);
    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: '2000', // Search within 500 meters
      type: ['restaurant'], // Search for restaurants
    };

    service.nearbySearch(request, (results, status, pagination) => {
      if (status !== "OK" || !results) return;

      setRestaurants(results);
      console.log(results); // You can remove this line once you confirm it's working
    });


  }, [map]); // This effect runs when the `map` object changes


  return (
    <>
      <div>test</div>
    </>
  );
}

const RestaurantMap = () => {
  const [restaurants, setRestaurants] = useState([]);
  const hunterLocation = { lat: 40.76785648078654, lng: -73.96447914218824 };


  // Function to handle marker click
  const handleMarkerClick = (restaurantName) => {
    console.log(restaurantName);
  };

  return (
    <APIProvider apiKey={config.mapsAPIKey}>
      <div className='w-3/4 h-full p-11'>
        <Map zoom={15} center={hunterLocation} mapId={config.mapID}>
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={restaurant.geometry.location}
              onClick={() => handleMarkerClick(restaurant.name)}
            />
          ))}
          <Marker position={hunterLocation} />
        </Map>
        <RestaurantMarkers location={hunterLocation} setRestaurants={setRestaurants}/>
      </div>
    </APIProvider>
  );
};

export default RestaurantMap;
