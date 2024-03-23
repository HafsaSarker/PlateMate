export interface User {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    firstName: string;
    lastName: string;
    profileImg?: string;
    coverImg?: string;
    about?: string;
    nationality?: string;
    sex?: string;
    height_ft?: number | null;
    height_in?: number | null;
    age?: number | null;
    smoke?: boolean;
    drink?: boolean;
    restaurantLocation: string;
    foodCategory: string;
    restaurantAttributes?: string[];
    pricePoint?: string[];
  };
}
