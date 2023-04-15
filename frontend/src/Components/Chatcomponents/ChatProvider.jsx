import React , {useState, createContext}from 'react'
export const ChatContext = createContext()
export const ChatProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [openContract, setOpenContract] = useState(false)
    const [Id, setId] = useState("")
  return (
    <ChatContext.Provider
    value={{
        currentUser,
        setCurrentUser,
        openContract,
        setOpenContract,
        Id,
        setId
    }}
    >
        {children}
    </ChatContext.Provider>
  )
}

