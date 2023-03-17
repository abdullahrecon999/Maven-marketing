import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../utils/authProvider'
import { useQuery, useMutation } from 'react-query'
import { ChatContext } from './ChatProvider'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { TextField  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
import { storage } from '../../utils/fireBase/fireBaseInit';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"
import {TailSpin} from "react-loader-spinner"
import messageImage from "../../images/Messaging-rafiki.png"
const FallBack=()=>{
    return(<div className="h-screen flex flex-col flex-1 justify-center items-center px-4 py-4 bg-slate-50">
        <div className='flex flex-col border border-blue px-12 py-10 rounded-lg shadow-2xl w-[70%] h-[70vh] justify-center items-center'>
            <img src={messageImage} alt={messageImage} className="w-[80%] h-[80%]"/>
            <h1 className="text-4xl text-blue font-railway">Chat here</h1>
            <p className='text-xl text-grey font-railway'>your chats appear here</p>
        </div>
        

    </div>)
}

const ChatContainer = () => {
    const {user} = useContext(AuthContext)
    const {currentUser} = useContext(ChatContext)
    const [message, setMessage] = useState("")
    const [fileUpload, setFileUpload] = useState(null)
    const[disable, setdisable] = useState(false)
    const [Fileurl, setUrl] = useState("")
    const[isUploaded, setUpload] = useState(false)
    const [uploading, setUploading] = useState(false)

    const handleMessageChange=(e)=>{
        setUpload(false)
        setMessage(e.target.value)
        
    }

    const handleFileUpload = ()=>{
        console.log("file handler")
        if(fileUpload == null) return;
        const fileRef = ref(storage, `files/${fileUpload.name+ v4()}` )
        setUpload(false)
        setUploading(true)
        uploadBytes(fileRef,fileUpload).then(()=>{
            console.log("uploading the files in the db")
            
            getDownloadURL(fileRef).then((url)=>{
                alert("file is uploaded")
                console.log("this is the file reference")
                console.log(url)
                setUrl(url)
                console.log(uploading)
                setUploading(false)
                setUpload(true)
                console.log(Fileurl)

            })
            
        }).catch((e)=>{
            console.log(e)
        })
    }

    const {data, isLoading} = useQuery(["getAllMessages"], ()=>{
        if(Object.keys(currentUser).length !== 0 )
        console.log(currentUser["_id"])
        return axios.post("http://localhost:3000/chats/getMessages",{
            
                to: currentUser["_id"],
                from: user["_id"]
            
        })
    },{
        refetchInterval:1000
    })
    const {mutate} = useMutation(()=>{
        console.log("in mutation")
        var text = message
        setMessage("")
        if(Object.keys(currentUser).length !== 0){
            console.log("innn")
            if(fileUpload == null){
                setFileUpload(null)
                return axios.post("http://localhost:3000/chats/addMessage",
        
        {
            text: text,
            users:[
                currentUser["_id"],
                user["_id"]
            ],
            sender: user["_id"]

        }
        )
            }else{
                console.log("here")
                setdisable(false)
                setFileUpload(null)
                setUpload(false)
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
    {Object.keys(currentUser).length === 0?<FallBack/>:
    <div className='flex flex-col flex-1 shadow-inner'>
    <div className='flex shadow-md w-[100%] px-5 py-4'>
        <h1 className='text-xl text-black font-railway'>{currentUser?.name}</h1>
    </div>
    {isLoading?<div className='max-h-[75vh] flex-1'>loading</div>:
        <div className='flex-1 flex-col bg-slate-50 overflow-y-auto max-h-[75vh] px-6'>
        
        {data?.data?.projectMessages.map(msg=>{
            
            return (<div className={msg?.fromSelf===true?"flex justify-end my-1":"justify-start my-1"}>
                <h1 className={msg?.fromSelf===true?" text-white max-w-[50%] bg-blue rounded-full my-1 px-4 py-1":"text-black max-w-[40%] bg-slate-200 rounded-full my-2 px-4 py-1"}>{msg?.message}</h1>
            </div>)
            
        })}
    </div>
    }
    <div>
    <div className='flex items-center border shadow-md px-5 py-8 space-x-2'>
        <label htmlFor='fileInput'  className='text-grey hover:bg-gray-300 '>
        <AttachFileIcon/></label>
        <input 
        className='hidden'
        id='fileInput'
        
        onChange={(e)=>{
            setdisable(true)
            setFileUpload(e.target.files[0])
            handleFileUpload()
        }} type="file"></input>
        <TextField
        disabled={disable} 
        value={message}
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
        {uploading?<TailSpin
                                height="20"
                                width="20"
                                color="gray"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                />:<button onClick={()=>{
                                    console.log("chal ja yr teri mehr bani")
                                    mutate()
                                }}  className='text-grey rounded-full hover:bg-slate-300 p-3'><SendIcon/></button>}
        
    </div>
    {console.log("is uploaded", isUploaded)}
        {isUploaded && <p className="text-red-500">File uploaded</p>}
    </div>
    
    
</div>
    }
    </>
  )
}

export default ChatContainer