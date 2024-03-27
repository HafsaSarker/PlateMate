import { FilterForm } from './filterForm';

export interface PreferenceContextType {
  preferences: FilterForm | null;
  setPreferences: React.Dispatch<React.SetStateAction<FilterForm | null>>;
}
