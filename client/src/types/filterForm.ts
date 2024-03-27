export interface FilterForm {
  nationalities?: string[];
  male?: boolean;
  female?: boolean;
  other?: boolean;
  age_from?: number;
  age_to?: number;
  height_from_ft?: number;
  height_from_in?: number;
  height_to_ft?: number;
  height_to_in?: number;
  smoke?: boolean;
  drink?: boolean;
  _id?: string;
  uid?: string;
  createdAt?: string;
  updatedAt?: string;
}
