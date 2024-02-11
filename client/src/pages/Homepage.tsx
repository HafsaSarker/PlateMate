import React, { useState } from 'react';
import RestaurantMap from '../components/RestaurantMap';

const Homepage = () => {
  const hunterLocation = { lat: 40.76785648078654, lng: -73.96447914218824 };
  const [clickedRestaurant, setClickedRestaurant] = useState(null);

  return (
    <>
      <div className="w-3/4 h-full p-11">
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
                <p className="text-xs border border-gray rounded-md p-1 bg-gray-300 key={index}">
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
    </>
  );
};

export default Homepage;
