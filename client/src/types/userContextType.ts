import { User } from './user';

export interface UserContextType {
  currUser: User | null;
  setCurrUser: React.Dispatch<React.SetStateAction<User | null>>;
}
