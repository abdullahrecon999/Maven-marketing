import React , {useState, createContext}from 'react'
export const ContractContext = createContext()
export const ContractProvider = ({children}) => {
    const [contract, setContract] = useState({})
  return (
    <ContractContext.Provider
    value={{
        contract,
        setContract
        
    }}
    >
        {children}
    </ContractContext.Provider>
  )
}

