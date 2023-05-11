import React, { useState, createContext } from "react";
export const ContractContext = createContext();
export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState({});
  const [user, setUser] = useState({});
  return (
    <ContractContext.Provider
      value={{
        contract,
        setContract,
        user,
        setUser,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
