import { Restaurant } from './restaurant';

export interface RestaurantMapProps {
  setClickedRestaurant: (restaurant: Restaurant) => void;
}
