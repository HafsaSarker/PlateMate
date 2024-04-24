export interface RegisterProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;

  handleCategoriesChange?: (categories: string[]) => void;
}
