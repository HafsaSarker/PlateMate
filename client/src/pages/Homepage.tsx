import { useState } from 'react';
import RestaurantMap from '../components/map/RestaurantMap';
import { Restaurant } from '../types/restaurant';
import SelectedRestaurant from '../components/map/SelectedRestaurant';

const Homepage = () => {
  const hunterLocation = { lat: 40.76785648078654, lng: -73.96447914218824 };
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(
    null,
  );

  return (
    <div className="h-full w-full flex items-center overflow-y-auto">
      <div className="w-8/12 h-full p-11">
        <RestaurantMap setClickedRestaurant={setClickedRestaurant} />
      </div>

      <section className="flex-1 flex items-start h-full  pt-11 justify-start">
        {clickedRestaurant ? (
          <SelectedRestaurant clickedRestaurant={clickedRestaurant} />
        ) : (
          <div>
            <h2>Click on a restaurant to view details</h2>
          </div>
        )}

        {/* Here is where we fetch users matched at this location then display them, prob using a component*/}
      </section>
    </div>
  );
};

export default Homepage;
