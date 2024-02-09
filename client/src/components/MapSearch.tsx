import { useState } from "react";


const MapSearch = ({setCurrentLocation}) => {
  const [addressInput, setAddressInput] = useState('');

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
      console.log(data);
      setCurrentLocation(data.results[0].geometry.location);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>

      <input type="text" placeholder="Enter address" onChange={handleInputChange}/>
      <button onClick={getLocation}>Search</button>
    </div>
  );
}

export default MapSearch;