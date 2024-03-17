export interface FilterForm {
  nationalities?: string[];
  male?: boolean;
  female?: boolean;
  other?: boolean;
  age_from?: number;
  age_to?: number;
  height_from?: string;
  height_to?: string;
  smoke?: boolean;
  drink?: boolean;
}
