import { useState } from "react";

interface MapSearchProps {
  setCurrentLocation: (location: {lat: number, lng: number}) => void;
}


const MapSearch: React.FC<MapSearchProps> = ({setCurrentLocation}) => {
  const [addressInput, setAddressInput] = useState('695 Park Ave, New York, NY 10065');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  }

  const getLocation = async () => {
    const address = encodeURIComponent(addressInput)
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?`+
      `address=${address}&`+
      `key=${import.meta.env.VITE_MAPS_API}`);
      const data = await response.json();
      setCurrentLocation(data.results[0].geometry.location);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex ">

      <input className="w-1/2" type="text" placeholder={addressInput} onChange={handleInputChange}/>
      <button className="px-4 bg-primary" onClick={getLocation}>Search</button>
    </div>
  );
}

export default MapSearch;