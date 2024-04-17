import { config } from '../config';

interface LocationCoordinates {
  lat: number;
  lng: number;
}

export const getLocationCoordinates = async (
  locationName: string,
): Promise<LocationCoordinates | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        locationName,
      )}&key=${config.mapsAPIKey}`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const coordinates: LocationCoordinates =
        data.results[0].geometry.location;

      return coordinates;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching location coordinates:', error);
    return null;
  }
};
