export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImg?: File | null;
  coverImg?: File | null;
  about?: string;
  nationality?: string;
  sex?: string;
  height_ft?: number | null;
  height_in?: number | null;
  age?: number | null;
  smoke?: boolean;
  drink?: boolean;
  restaurantLocation: string;
  foodCategories: string[];
  restaurantAttributes?: string[];
  pricePoint?: string[];
}
