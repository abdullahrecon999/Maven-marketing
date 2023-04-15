import React from 'react'
import ChatSideBar from './ChatSideBar'
import ChatContainer from "./ChatContainer"
import {ChatProvider} from "./ChatProvider"
const Chat = () => {
  
  return (
    <ChatProvider>
      <div className='flex h-screen'>
      
      <ChatSideBar ></ChatSideBar>
      <ChatContainer></ChatContainer>
      
    </div>
    </ChatProvider>
  )
}

export default Chat