import React , {useState, createContext}from 'react'
export const ChatContext = createContext()
export const ChatProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
  return (
    <ChatContext.Provider
    value={{
        currentUser,
        setCurrentUser
    }}
    >
        {children}
    </ChatContext.Provider>
  )
}

