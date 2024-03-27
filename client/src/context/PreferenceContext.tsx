import { createContext, useState } from 'react';
import { PreferenceContextType } from '../types/PreferenceContextType';
import { FilterForm } from '../types/filterForm';

export const PreferenceContext = createContext<PreferenceContextType | null>(
  null,
);

export const PreferenceContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [preferences, setPreferences] = useState<FilterForm | null>(null);

  return (
    <PreferenceContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferenceContext.Provider>
  );
};
