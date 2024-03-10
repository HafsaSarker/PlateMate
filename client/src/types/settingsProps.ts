import { FormData } from './formData';

export interface SettingsProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  formData: FormData;
}
