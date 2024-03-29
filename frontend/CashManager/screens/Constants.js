import React, { createContext, useContext, useState } from 'react';

const ConstantsContext = createContext();

export const ConstantsProvider = ({ children }) => {
  const [selectedProds, setSelectedProds] = useState([]);

  return (
    <ConstantsContext.Provider value={{ selectedProds, setSelectedProds }}>
      {children}
    </ConstantsContext.Provider>
  );
};

export const useConstants = () => {
  return useContext(ConstantsContext);
};
