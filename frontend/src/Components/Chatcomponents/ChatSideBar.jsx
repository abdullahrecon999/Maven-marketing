import React ,  { useContext}from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { AuthContext } from '../../utils/authProvider'
import { ChatContext } from './ChatProvider'
const ChatSideBar = ({setCurrent}) => {
    const {user} = useContext(AuthContext)
    const {currentUser,setCurrentUser} = useContext(ChatContext)
    
    const {isLoading, isError, isSuccess, data, status} = useQuery(["getContacts"],()=>{
        return axios.get(`http://localhost:3000/chats/getContacts/${user["_id"]}`,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    })

    
    if(isLoading){
        return (<div> loading</div>)
    }
  return (
    <div className='flex flex-col w-[25%] border-r-2 shadow-md '>
        <h1 className='font-railway text-2xl mx-3 mt-3 mb-4'> Messages</h1>
        {data.data.data[0].contacts?.lenght===0? <div className='flex flex-col px-3 py-12'>
          <h1> your contacts appear here</h1>
        </div>:<div className='flex flex-col items-center'>
            {/* {console.log(data.data.data[0].contacts.map(item =>{
                return (item.contact.name)
            }))} */}
            {data.data.data[0].contacts.map(item=>{

                return (<div onClick={()=>{
                    console.log("clicked")
                    setCurrentUser(item.contact)
                    
                }} key={item} className="flex flex-col items-start p-3 border w-[100%] hover:bg-grey">
                    <h1 className='text-xl font-railway'>{item.contact.name}</h1>
                </div>)
            })}
        </div>}
        
    </div>
  )
}

export default ChatSideBar