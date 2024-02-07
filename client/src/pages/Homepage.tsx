import React from 'react';
import RestaurantMap from '../components/RestaurantMap';

const Homepage = () => {
  const hunterLocation = {lat: 40.76785648078654, lng: -73.96447914218824};

  return(
    <>
      <h1>Test</h1>
      <RestaurantMap />
    </>

  );

};

export default Homepage;