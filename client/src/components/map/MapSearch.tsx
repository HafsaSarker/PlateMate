import { useState } from 'react';
import { MapSearchProps } from '../../types/mapSearchProps';

const MapSearch: React.FC<MapSearchProps> = ({ setCurrentLocation }) => {
  const [addressInput, setAddressInput] = useState(
    '695 Park Ave, New York, NY 10065',
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  const getLocation = async () => {
    const address = encodeURIComponent(addressInput);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?` +
          `address=${address}&` +
          `key=${import.meta.env.VITE_MAPS_API}`,
      );
      const data = await response.json();
      setCurrentLocation(data.results[0].geometry.location);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex pt-11 pb-2">
      <input
        className="w-1/2 border-indigo-600 rounded-l-lg text-sm h-8 focus:outline-none focus:border-none text-indigo-600"
        type="text"
        placeholder={addressInput}
        onChange={handleInputChange}
      />
      <button
        className="px-4 bg-indigo-600 text-gray-50 rounded-r-lg text-sm focus:outline-none focus:border-none hover:bg-indigo-500"
        onClick={getLocation}
      >
        Search
      </button>
    </div>
  );
};

export default MapSearch;
