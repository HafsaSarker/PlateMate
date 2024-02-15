import React from 'react';
import { SelectedRestaurantProp } from '../../types/selectedRestaurantProp';

const SelectedRestaurant: React.FC<SelectedRestaurantProp> = ({
  clickedRestaurant,
}) => {
  return (
    <a
      className="restaurant w-full border py-2 px-2 mx-4 rounded-lg bg-gray-50 shadow-md max-w-96"
      href={clickedRestaurant.url}
      target="_blank"
    >
      <div className="flex flex-col gap-0.5 items-start">
        {clickedRestaurant.image_url ? (
          <img
            className="max-h-48 object-cover w-full rounded-lg"
            src={clickedRestaurant.image_url}
            alt="restaurant_img"
          />
        ) : (
          <img
            className="max-h-48 object-cover w-full rounded-lg"
            src="no-image.jpg"
            alt="restaurant_img"
          />
        )}

        <h2 className="font-bold text-xl">{clickedRestaurant.name}</h2>
        <div className="flex gap-2 text-sm">
          <p>
            {clickedRestaurant.rating}
            <span>★</span>
          </p>
          <p>({clickedRestaurant.review_count} review count)</p>
          <p>{clickedRestaurant.price}</p>
        </div>

        {clickedRestaurant.location.display_address &&
        clickedRestaurant.location.state &&
        clickedRestaurant.location.zip_code ? (
          <p className="text-sm text-gray-500">
            {clickedRestaurant.location.display_address[0]}
            {', '}
            {clickedRestaurant.location.state}
            {', '}
            {clickedRestaurant.location.zip_code}
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            {clickedRestaurant.location.display_address[0]}
          </p>
        )}

        <div className="flex text-gray-500 gap-1.5 pt-2">
          {clickedRestaurant.categories.map((category, index) => (
            <p
              key={index}
              className="text-xs border border-gray rounded-full py-0.5 px-1 bg-gray-100 key={index}"
            >
              {category.title}
            </p>
          ))}
        </div>
      </div>
    </a>
  );
};

export default SelectedRestaurant;
