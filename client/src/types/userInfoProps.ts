import { User } from './user';

export interface UserInfoProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
