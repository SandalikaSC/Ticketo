import React, { createContext, useContext, useState } from 'react';

const ControlCenterContext = createContext();

export const ControlCenterProvider = ({ children }) => {
  const [propValue1, setPropValue1] = useState(null);
  const [propValue2, setPropValue2] = useState(null);

  const setProps = (value1, value2) => {
    setPropValue1(value1);
    setPropValue2(value2);
  };

  return (
    <ControlCenterContext.Provider value={{ propValue1, propValue2, setProps }}>
      {children}
    </ControlCenterContext.Provider>
  );
};

export const useControlCenter = () => {
  return useContext(ControlCenterContext);
};
