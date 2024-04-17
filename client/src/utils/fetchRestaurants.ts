import { Restaurant } from '../types/restaurant';

export const fetchRestaurants = async (
  location: string | undefined,
  categorie: string | undefined,
  attributes: string[] | undefined,
  pricePoint: string[] | undefined,
): Promise<Restaurant[]> => {
  const baseUrl = `/yelp-api/v3/businesses/search`;

  // building the query parameters
  let queryParams = `?term=restaurants&location=${location}&categories=${categorie}`;

  if (attributes?.length) {
    queryParams += `&attributes=${attributes}`;
  }

  if (pricePoint?.length) {
    queryParams += `&price=${pricePoint}`;
  }

  const url = `${baseUrl}${queryParams}&radius=40000&sort_by=distance&limit=50`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    return data.businesses || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
