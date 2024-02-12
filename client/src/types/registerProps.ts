export interface RegisterProps {
  // formData: FormData;
  //   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  // handleSubmit: (e: React.FormEvent) => void;
}
