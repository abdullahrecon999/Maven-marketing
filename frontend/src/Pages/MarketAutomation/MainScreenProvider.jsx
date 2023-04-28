import React, { useState, createContext, useRef } from "react";
export const MainScreenMarketAutomationContext = createContext();
export const MarketAutomationProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  return (
    <MainScreenMarketAutomationContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </MainScreenMarketAutomationContext.Provider>
  );
};
