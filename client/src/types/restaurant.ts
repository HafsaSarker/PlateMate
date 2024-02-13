export interface Restaurant {
  name: string;
  image_url: string;
  rating: number;
  price: string;
  location: {
    display_address: string;
  };
  phone: string;
  url: string;
  review_count: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  categories: [{ title: string }];
}
