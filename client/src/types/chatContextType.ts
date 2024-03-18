import { User } from './user';

export interface ChatContextType {
  currPartner: User | null;
  setCurrPartner: React.Dispatch<React.SetStateAction<User | null>>;
}
