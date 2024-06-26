import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { config } from '../../config';
import { debounce } from 'lodash';
import MapSearch from './MapSearch';
import { Restaurant } from '../../types/restaurant';
import { RestaurantMapProps } from '../../types/restaurantMapProps';
import { MapEvent } from '../../types/mapEvent';
import { UserContextType } from '../../types/userContextType';
import { UserContext } from '../../context/UserContext';
import { getLocationCoordinates } from '../../utils/getLocationCoordinates';
import { fetchRestaurants } from '../../utils/fetchRestaurants';
import { MapMarker } from '../../types/mapMarker';
import CoordsNotFound from './CoordsNotFound';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { VscSettings } from 'react-icons/vsc';

const RestaurantMap: React.FC<RestaurantMapProps> = ({
  setClickedRestaurant,
  setShowFilters,
  clickedRestaurant,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]); // store map markers

  // initial currLocation
  // changes after fetching currUser's location prefs
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { currUser } = useContext(UserContext) as UserContextType;

  const [mapCenter, setMapCenter] = useState(currentLocation);
  const mapCenterRef = useRef(mapCenter); // this is so the debounced function can access the latest mapCenter

  const [isError, setIsError] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Get user's preffered location
  useEffect(() => {
    if (currUser) {
      getLocationCoordinates(currUser.profile.restaurantLocation).then(
        (coordinates) => {
          if (coordinates) {
            setCurrentLocation(coordinates);
            setIsError(false);
          } else {
            setIsError(true);
          }
        },
      );
    }
  }, [currUser]);

  useEffect(() => {
    mapCenterRef.current = mapCenter; // Update ref on mapCenter change
  }, [mapCenter]);

  // pass restaurant info up to parent to use on right section
  const handleMarkerClick = (restaurant: Restaurant) => {
    setClickedRestaurant(restaurant);
  };

  const updateRestaurants = async () => {
    const data = await fetchRestaurants(
      currUser?.profile.restaurantLocation
        ? currUser.profile.restaurantLocation
        : '',
      currUser?.profile.foodCategories ? currUser.profile.foodCategories : [],
      currUser?.profile.restaurantAttributes
        ? currUser.profile.restaurantAttributes
        : [],
      currUser?.profile.pricePoint ? currUser.profile.pricePoint : [],
    );

    setRestaurants(data);

    if (!clickedRestaurant) {
      setClickedRestaurant(data[0]);
    }

    // Set markers on the map based on yelp results
    const markers = data.map((restaurant: Restaurant) => ({
      position: {
        lat: restaurant.coordinates.latitude,
        lng: restaurant.coordinates.longitude,
      },
      onClick: () => handleMarkerClick(restaurant),
    }));
    setMapMarkers(markers);
  };

  // debounced api call so we don't make a request on every map move, updates after .4 second
  const debouncedFetchRestaurants = useCallback(
    debounce(() => {
      updateRestaurants();
    }, 400),
    [currUser],
  );

  useEffect(() => {
    updateRestaurants();
  }, [currUser]);

  // Call debouncedFetchRestaurants on mapCenter change
  useEffect(() => {
    debouncedFetchRestaurants();
  }, [mapCenter, debouncedFetchRestaurants]);

  // updates the center of the map when it is moved
  const updateMap = (map: MapEvent) => {
    const center = map.detail.center;
    setMapCenter(center);
  };

  return (
    <>
      {/* modify search (users and location) */}
      <div className="flex items-center w-full justify-end gap-3">
        <div className="flex pt-5 pb-2 justify-end">
          <button
            className="flex items-center gap-2 px-4 py-1 bg-indigo-600 text-gray-50 rounded-lg text-sm focus:outline-none focus:border-none hover:bg-indigo-500"
            onClick={() => setShowSearch(true)}
          >
            Modify Search
            <span>
              <FaWandMagicSparkles />
            </span>
          </button>
        </div>

        <div className="flex pt-5 pb-2 justify-end">
          <button
            className="flex items-center gap-2 px-4 py-1 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={() => setShowFilters(true)}
          >
            Filter Matches
            <span>
              <VscSettings />
            </span>
          </button>
        </div>
      </div>
      {/* map */}
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
              <AdvancedMarker key={index} {...marker} />
            ))}
            <AdvancedMarker position={currentLocation}>
              <img
                src="./pin.png"
                alt="Custom Icon"
                className="w-[70px] h-[70px]"
              />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>

      {/* error component */}
      {isError && (
        <CoordsNotFound
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setIsError={setIsError}
        />
      )}

      {/* search component */}
      {showSearch && <MapSearch setShowSearch={setShowSearch} />}
    </>
  );
};

export default RestaurantMap;
