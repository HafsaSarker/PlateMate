import { useState } from 'react';
import { MapSearchProps } from '../../types/mapSearchProps';
import { FaWandMagicSparkles } from 'react-icons/fa6';

const MapSearch: React.FC<MapSearchProps> = ({ showSearch, setShowSearch }) => {
  const handleChange = () => {};

  const handleSearch = async () => {};

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-20"
    >
      <div className="relative p-4 w-6/12 max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div className="flex flex-row justify-center items-center pt-5 border-b p-4 md:p-5 border-gray-200">
            <h1 className="text-red-600 font-semibold text-lg">
              Modify Search
            </h1>
            <img src="./hearts.png" width={30} alt="" />
          </div>
          {/* <!-- Modal body --> */}
          <div className="flex flex-col items-center justify-between pt-8 p-4 md:p-5 rounded-t">
            <form className="flex flex-col gap-2" onSubmit={handleSearch}>
              <div className="col-span-full">
                <label
                  htmlFor="restaurantLocation"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location Preferred*
                </label>
                <div>
                  <input
                    type="text"
                    name="restaurantLocation"
                    id="restaurantLocation"
                    // value={formData.restaurantLocation}
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="foodCategory"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Food Category*
                </label>
                <div>
                  <input
                    type="text"
                    name="foodCategory"
                    id="foodCategory"
                    // value={formData.foodCategory}
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
                <span className="block text-xs font-medium leading-6 text-gray-900">
                  View a list of all categories{' '}
                  <a
                    href="https://blog.yelp.com/businesses/yelp_category_list/"
                    target="_blank"
                    className="text-red-600 hover:underline"
                  >
                    here
                  </a>
                </span>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="restaurantAttributes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Restaurant Attributes
                </label>

                <div>
                  <select
                    id="restaurantAttributes"
                    name="restaurantAttributes"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    multiple
                    onChange={handleChange}
                    // value={formData.restaurantAttributes}
                  >
                    <option value="reservation">Reservation</option>
                    <option value="deals">Deals</option>
                    <option value="wheelchair_accessible">
                      Wheelchair Accessible
                    </option>
                    <option value="parking_lot">Parking Lot</option>
                    <option value="outdoor_seating">Outdoor Seating</option>
                    <option value="wifi_free">Free Wifi</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="pricePoint"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price Point
                </label>
                <div>
                  <select
                    id="pricePoint"
                    name="pricePoint"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    multiple
                    onChange={handleChange}
                    // value={formData.pricePoint}
                  >
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              type="button"
              className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
            >
              Search
            </button>
            <button
              onClick={() => setShowSearch(false)}
              className="rounded-lg text-sm px-3 py-1.5  ms-3  font-medium text-gray-900 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
