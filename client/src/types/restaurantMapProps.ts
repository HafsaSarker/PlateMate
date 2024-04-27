import { Restaurant } from './restaurant';

export interface RestaurantMapProps {
  setClickedRestaurant: (restaurant: Restaurant) => void;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  clickedRestaurant: Restaurant | null;
}
