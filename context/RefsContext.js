// context/RefsContext.js
import { createContext, useContext, useRef } from 'react';

const RefsContext = createContext();

export const useRefs = () => useContext(RefsContext);

export const RefsProvider = ({ children }) => {
  const outerSectionRef = useRef(null);
  

  return (
    <RefsContext.Provider value={{ outerSectionRef }}>
      {children}
    </RefsContext.Provider>
  );
};
