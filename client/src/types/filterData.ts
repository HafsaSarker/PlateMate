import { FilterForm } from './filterForm';

export interface FilterData {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  filters: FilterForm;
}

export interface CountriesFilterData {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  filters: FilterForm;
  setFilters: React.Dispatch<React.SetStateAction<FilterForm>>;
}
