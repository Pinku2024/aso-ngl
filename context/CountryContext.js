import { createContext,useContext, useState } from 'react';

export const CountryContext = createContext();

export const useSelectedCountry = () => {
    return useContext(CountryContext)
  }
export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'in',
    name: 'India',
    flag: 'in.png',
  });

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
