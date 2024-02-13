import { useState } from 'react';
import RestaurantMap from '../components/map/RestaurantMap';

interface Restaurant {
  name: string;
  image_url: string;
  rating: number;
  price: string;
  location: {
    display_address: string;
  };
  phone: string;
  url: string;
  review_count: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  categories: [{ title: string }];
}

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

      <section className="right flex items-center w-1/4 h-full p-2 justify-center">
        {clickedRestaurant ? (
          <div className="restaurant w-full">
            <h2 className="font-bold text-xl">{clickedRestaurant.name}</h2>
            <div className="flex gap-2">
              <p>{clickedRestaurant.rating}★</p>
              <p>({clickedRestaurant.review_count})</p>
              <p>{clickedRestaurant.price}</p>
            </div>

            <p className="text-sm text-gray-500">
              {clickedRestaurant.location.display_address}
            </p>
            <div className="flex text-gray-500">
              {clickedRestaurant.categories.map((category, index) => (
                <p
                  key={index}
                  className="text-xs border border-gray rounded-md p-1 bg-gray-300 key={index}"
                >
                  {category.title}
                </p>
              ))}
            </div>

            <img
              className="max-h-48 w-full object-cover"
              src={clickedRestaurant.image_url}
              alt="restaurant_img"
            />
          </div>
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
