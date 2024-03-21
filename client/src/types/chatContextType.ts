import { User } from './user';

export interface ChatContextType {
  currPartner: User | null;
  setCurrPartner: React.Dispatch<React.SetStateAction<User | null>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}
