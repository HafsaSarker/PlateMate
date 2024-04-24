export interface MapSearchProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FoodCategoriesProps {
  handleCategoriesChange: (categories: string[]) => void;
  currCategories: string[];
}
