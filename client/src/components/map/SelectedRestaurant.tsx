import React from 'react';
import { SelectedRestaurantProp } from '../../types/selectedRestaurantProp';

const SelectedRestaurant: React.FC<SelectedRestaurantProp> = ({
  clickedRestaurant,
}) => {
  return (
    <>
      <a
        className="restaurant w-full border py-2 pr-48 pl-2 mx-4 rounded-lg bg-gray-100 hover:bg-gray-200"
        href={clickedRestaurant.url}
        target="_blank"
      >
        <div className="flex flex-col gap-0.5 items-start w-full">
          {clickedRestaurant.image_url ? (
            <img
              className="max-h-[150px] object-cover w-full rounded-lg"
              src={clickedRestaurant.image_url}
              alt="restaurant_img"
            />
          ) : (
            <img
              className="max-h-[150px] object-cover w-full rounded-lg"
              src="no-image.jpg"
              alt="no-image"
            />
          )}

          <h2 className="font-bold text-xl text-orange-600">
            {clickedRestaurant.name}
          </h2>
          <div className="flex gap-1 text-sm">
            <p>{clickedRestaurant.rating}★</p>
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
                className="text-xs border border-gray rounded-full py-0.5 px-1 bg-gray-200 "
              >
                {category.title}
              </p>
            ))}
          </div>
        </div>
      </a>
    </>
  );
};

export default SelectedRestaurant;
