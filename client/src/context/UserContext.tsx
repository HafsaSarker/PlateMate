import { createContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { UserContextType } from '../types/userContextType';
import getImageUrl from '../utils/getImageUrl';

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string>('');

  const fetchUserImage = async () => {
    if (!currUser?.profile.profileImg) {
      setUserImageUrl('user.png');
      return;
    }
    const url = await getImageUrl(currUser?.profile.profileImg);
    setUserImageUrl(url);
  }
  useEffect(() => {
    fetchUserImage();
  }, [currUser]);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, userImageUrl }}>
      {children}
    </UserContext.Provider>
  );
};
