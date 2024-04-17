export interface MapMarker {
  position: {
    lat: number;
    lng: number;
  };
  onClick: () => void;
}
