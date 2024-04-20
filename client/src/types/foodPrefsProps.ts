import { RegisterProps } from './registerProps';

export interface FoodPrefsProps extends Partial<RegisterProps> {
  handleCategoriesChange: (categories: string[]) => void;
}
