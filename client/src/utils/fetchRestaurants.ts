import { Restaurant } from '../types/restaurant';

export const fetchRestaurants = async (
  location: string,
  categories: string[],
  attributes: string[],
  pricePoint: string[],
): Promise<Restaurant[]> => {
  const baseUrl = `/yelp-api/v3/businesses/search`;

  // building the query parameters
  let queryParams = `?term=restaurants&location=${encodeURIComponent(location)}`;

  if (categories.length) {
    queryParams += `&categories=${categories.map((category) => category.toLowerCase()).join(',')}`;
  }

  if (attributes?.length) {
    queryParams += `&attributes=${attributes.join(',')}`;
  }

  if (pricePoint?.length) {
    queryParams += `&price=${pricePoint.join(',')}`;
  }

  const url = `${baseUrl}${queryParams}&radius=40000&sort_by=best_match&limit=50`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    return data.businesses || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
