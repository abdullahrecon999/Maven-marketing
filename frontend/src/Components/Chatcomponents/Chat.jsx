import React from 'react'
import ChatSideBar from './ChatSideBar'
import ChatContainer from "./ChatContainer"
import {ChatProvider} from "./ChatProvider"
const Chat = () => {
  
  return (
    <ChatProvider>
      <div className='flex '>
      
      <ChatSideBar ></ChatSideBar>
      <ChatContainer></ChatContainer>
      
    </div>
    </ChatProvider>
  )
}

export default Chat