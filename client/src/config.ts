interface AppConfig {
  mapsAPIKey: string;
  mapID: string;
  yelpAPIKey: string;
}

export const config: AppConfig = {
  mapsAPIKey: import.meta.env.VITE_MAPS_API as string,
  mapID: import.meta.env.VITE_MAP_ID as string,
  yelpAPIKey: import.meta.env.VITE_YELP_API_KEY as string,
};
