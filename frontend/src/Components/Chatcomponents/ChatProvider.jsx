import React, { useState, createContext, useRef } from "react";
export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [openContract, setOpenContract] = useState(false);
  const [Id, setId] = useState("");
  const socket = useRef();
  return (
    <ChatContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        openContract,
        setOpenContract,
        Id,
        setId,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
