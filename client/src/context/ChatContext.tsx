import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ currPartner, setCurrPartner ] = useState(null);
  return (
    <ChatContext.Provider value={{ currPartner, setCurrPartner}}>
      {children}
    </ChatContext.Provider>
  );
};
