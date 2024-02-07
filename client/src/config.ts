interface AppConfig {
  mapsAPIKey: string;
  mapID: string;
}

export const config: AppConfig = {
  mapsAPIKey: import.meta.env.VITE_MAPS_API as string,
  mapID: import.meta.env.VITE_MAP_ID as string,
};
