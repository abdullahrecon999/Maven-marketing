import React, { useState, createContext, useRef } from "react";
export const MainScreenMarketAutomationContext = createContext();
export const MarketAutomationProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [switchScreen, setSwitch] = useState(true);
  return (
    <MainScreenMarketAutomationContext.Provider
      value={{
        files,
        setFiles,
        switchScreen,
        setSwitch,
      }}
    >
      {children}
    </MainScreenMarketAutomationContext.Provider>
  );
};
