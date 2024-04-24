import { FormData } from './formData';

export interface SettingsProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  formData: FormData;
}

export interface FoodCategoriesProps extends SettingsProps {
  handleCategoriesChange: (categories: string[]) => void;
}
