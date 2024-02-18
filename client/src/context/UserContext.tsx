import { createContext, useState } from 'react';
import { User } from '../types/user';
import { UserContextType } from '../types/userContextType';

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currUser, setCurrUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </UserContext.Provider>
  );
};
