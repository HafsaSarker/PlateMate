import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Marker,
  Pin,
} from '@vis.gl/react-google-maps';
import { config } from '../../config';
import { debounce } from 'lodash';
import MapSearch from './MapSearch';
import { Restaurant } from '../../types/restaurant';
import { RestaurantMapProps } from '../../types/restaurantMapProps';
import { MapEvent } from '../../types/mapEvent';
import { UserContextType } from '../../types/userContextType';
import { UserContext } from '../../context/UserContext';
import { getLocationCoordinates } from '../../utils/getLocationCoordinates';

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  setClickedRestaurant,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [mapMarkers, setMapMarkers] = useState<Restaurant[]>([]); // store map markers

  // initial currLocation
  // changes after fetching currUser's location prefs
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { currUser } = useContext(UserContext) as UserContextType;

  const [mapCenter, setMapCenter] = useState(currentLocation);
  const mapCenterRef = useRef(mapCenter); // this is so the debounced function can access the latest mapCenter

  // Get user's preffered location
  useEffect(() => {
    if (!currentLocation && currUser) {
      getLocationCoordinates(currUser.profile.restaurantLocation).then(
        (coordinates) => {
          if (coordinates) {
            setCurrentLocation(coordinates);
          } else {
            console.log('Coordinates not found');
          }
        },
      );
    }
  }, [currentLocation]);

  useEffect(() => {
    mapCenterRef.current = mapCenter; // Update ref on mapCenter change
  }, [mapCenter]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        `/yelp-api/v3/businesses/search?term=restaurants` +
          `&location=${currUser?.profile.restaurantLocation}` +
          `&categories=${currUser?.profile.foodCategory}` +
          `&attributes=${currUser?.profile.restaurantAttributes}` +
          `&radius=40000` +
          `&sort_by=distance` +
          `&limit=50` +
          `&price=${currUser?.profile.pricePoint}`,
        {
          method: 'GET',
        },
      );
      const data = await response.json();
      setRestaurants(data.businesses);

      // Set markers on the map based on yelp results
      const markers = data.businesses.map((restaurant: Restaurant) => ({
        position: {
          lat: restaurant.coordinates.latitude,
          lng: restaurant.coordinates.longitude,
        },
        onClick: () => handleMarkerClick(restaurant),
      }));
      setMapMarkers(markers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // debounced api call so we don't make a request on every map move, updates after .4 second
  const debouncedFetchRestaurants = useCallback(
    debounce(() => {
      fetchRestaurants();
    }, 400),
    [],
  );

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
  };

  // updates the center of the map when it is moved
  const updateMap = (map: MapEvent) => {
    const center = map.detail.center;
    setMapCenter(center);
  };

  return (
    <>
      <MapSearch setCurrentLocation={setCurrentLocation} />
      <APIProvider apiKey={config.mapsAPIKey}>
        <div className="w-full h-full pb-11">
          <Map
            zoom={11}
            center={currentLocation}
            mapId={config.mapID}
            onCenterChanged={(map) => updateMap(map)}
          >
            {/* Render markers based on mapMarkers state */}
            {mapMarkers.map((marker, index) => (
              <Marker key={index} {...marker} />
            ))}
            <AdvancedMarker position={currentLocation}>
              <Pin
                background={'#f472b6'}
                borderColor={'#fb923c'}
                glyphColor={'#fb923c'}
                scale={1.3}
              />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

export default RestaurantMap;
