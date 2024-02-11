import React ,  { useEffect, useState, useCallback, useRef  }from 'react';
import { APIProvider, AdvancedMarker, Map, Marker, Pin } from '@vis.gl/react-google-maps';
import { config } from '../config';
import {debounce} from 'lodash';
import MapSearch from './MapSearch';

interface MapEvent {
  detail: {
    center: {
      lat: number;
      lng: number;
    };
  };
}

interface RestaurantMapProps {
  setClickedRestaurant: (restaurant: Restaurant) => void;
}

interface Restaurant {
  name: string;
  image_url: string;
  rating: number;
  price: string;
  location: string;
  phone: string;
  url: string;
  coordinates: {
    latitude: number;
    longitude: number;
  },
  categories: [{title: string;}]
}

const RestaurantMap:React.FC<RestaurantMapProps> = ({setClickedRestaurant}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.76785648078654, lng: -73.96447914218824 });

  // hard coded for now
  const price = 1;

  const [mapCenter, setMapCenter] = useState(currentLocation);
  const mapCenterRef = useRef(mapCenter); // this is so the debounced function can access the latest mapCenter

  useEffect(() => {
    mapCenterRef.current = mapCenter; // Update ref on mapCenter change
  }, [mapCenter]);

  const fetchRestaurants = async () => {
    const { lat, lng } = mapCenterRef.current;
    try {
      const response = await fetch(`/yelp-api/v3/businesses/search?term=restaurants` +
      `&latitude=${lat}`+
      `&longitude=${lng}`+
      `&radius=40000`+
      `&sort_by=distance`+
      `&limit=50`+
      `&price=${price}`,
        {
          method: 'GET',
      });
      const data = await response.json();
      setRestaurants(data.businesses);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // debounced api call so we don't make a request on every map move, updates after .4 second
  const debouncedFetchRestaurants = useCallback(debounce(() => {
    fetchRestaurants();
  }, 400), []);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Call debouncedFetchRestaurants on mapCenter change
  useEffect(() => {
    debouncedFetchRestaurants();
  }, [mapCenter, debouncedFetchRestaurants]);

  // pass restaurant info up to parent to use on right section
  const handleMarkerClick = (restaurant: Restaurant) => {
    setClickedRestaurant(restaurant);
    console.log(restaurant)
  };

  // updates the center of the map when it is moved
  const updateMap = (map:MapEvent) => {
    const center = map.detail.center;
    setMapCenter(center);
  }

  return (
    <>
    <MapSearch setCurrentLocation={setCurrentLocation}/>
    <APIProvider apiKey={config.mapsAPIKey}>
      <div className='w-full h-full'>
        <Map
          zoom={17}
          center={currentLocation}
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
            <Pin background={'#f472b6'} borderColor={'#fb923c'} glyphColor={'#fb923c'} scale={1.3}/>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
    </>

  );
};

export default RestaurantMap;
