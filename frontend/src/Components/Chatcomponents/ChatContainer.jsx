import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../utils/authProvider'
import { useQuery, useMutation } from '@tanstack/react-query'
import { ChatContext } from './ChatProvider'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { TextField  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
import { storage } from '../../utils/fireBase/fireBaseInit';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
const ChatContainer = () => {
    const {user} = useContext(AuthContext)
    const {currentUser} = useContext(ChatContext)
    const [message, setMessage] = useState("")
    const [fileUpload, setFileUpload] = useState(null)
    const[disable, setdisable] = useState(false)
    const [Fileurl, setUrl] = useState("")
    console.log(currentUser["_id"])

    const handleMessageChange=(e)=>{
        setMessage(e.target.value)
        console.log(message)
    }

    const handleFileUpload = ()=>{
        if(fileUpload == null) return;
        const fileRef = ref(storage, `files/${fileUpload.name+ v4()}` )
        uploadBytes(fileRef,fileUpload).then(()=>{
            
            getDownloadURL(fileRef).then((url)=>{
                console.log(url)
                setUrl(url)
            })
            alert(Fileurl)
        })
    }

    const {data, isLoading, isError} = useQuery(["getAllMessages"], ()=>{
        if(Object.keys(currentUser).length !== 0 )
        console.log(currentUser["_id"])
        return axios.post("http://localhost:3000/chats/getMessages",{
            
                to: currentUser["_id"],
                from: user["_id"]
            
        })
    },{
        refetchInterval:2000
    })
    const {mutate} = useMutation(()=>{

        if(Object.keys(currentUser).length !== 0 && message !==""){
            if(fileUpload == null){
                return axios.post("http://localhost:3000/chats/addMessage",
        
        {
            text: message,
            users:[
                currentUser["_id"],
                user["_id"]
            ],
            sender: user["_id"]

        }
        )
            }else{
                return axios.post("http://localhost:3000/chats/addMessage",
        
        {
            text: Fileurl,
            users:[
                currentUser["_id"],
                user["_id"]
            ],
            sender: user["_id"]

        }
        )
            }

            
    }
    })
  return (
    <>
    {Object.keys(currentUser).length === 0?<div>fallback</div>:
    <div className='flex flex-col flex-1 shadow-inner'>
    <div className='flex shadow-md w-[100%] px-5 py-4'>
        <h1 className='text-xl text-black font-railway'>{currentUser?.name}</h1>
    </div>
    {isLoading?<div>loading</div>:
        <div className='flex-1 flex-col bg-slate-50 overflow-y-auto max-h-[75vh] px-6'>
        <h1 className='text-end'>asdfjhasdjhsd</h1>
        {data?.data?.projectMessages.map(msg=>{
            console.log(msg.fromSelf)
            return (<div className={msg?.fromSelf===true?"flex justify-end my-1":"justify-start my-1"}>
                <h1 className={msg?.fromSelf===true?" text-white max-w-[50%] bg-blue rounded-full my-1 px-4 py-1":"text-black max-w-[40%] bg-slate-200 rounded-full my-2 px-4 py-1"}>{msg?.message}</h1>
            </div>)
            
        })}
    </div>
    }
    <div className='flex items-center border shadow-md px-5 py-8 space-x-2'>
        <label  className='text-grey hover:bg-gray-300 '>
        <AttachFileIcon/></label>
        <input onChange={(e)=>{
            setdisable(true)
            setFileUpload(e.target.files[0])
            handleFileUpload()
        }} type="file"></input>
        <TextField
        disabled={disable} 
        size='small'
        placeholder='send message ...' 
        sx={{
            width: "70%",
            borderRadius: 200
        }}
        onChange={(e)=>{
           handleMessageChange(e)
        }}
        ></TextField>
        <button onClick={()=>{
            mutate()
        }}  className='text-grey rounded-full hover:bg-slate-300 p-3'><SendIcon/></button>
    </div>
    
    
</div>
    }
    </>
  )
}

export default ChatContainer