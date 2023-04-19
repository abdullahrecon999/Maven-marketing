import React, {useState, useEffect, useContext, useRef} from 'react'
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
import Contract from './ContractContainer';
import InfluencerGenaricModel from "../InfluencerComponents/InfluencerGenaricModal"
import CloseIcon from '@mui/icons-material/Close';


const FallBack=()=>{
    return(<div className="h-[80vh] flex flex-col flex-1 mt-10 items-center px-4 py-2 bg-slate-50">
        <div className='flex flex-col border-gray-400 border-2 shadow-inner  px-12 py-6 rounded-lg  w-[70%] h-[50vh] justify-center items-center'>
            
            <h1 className="text-4xl text-gray-600 font-railway">Chat here</h1>
            <p className='text-xl text-grey font-railway'>your chats appear here</p>
        </div>
        

    </div>)
}

const ContractModel =()=>{
    const [Data, setData] = useState({})
    const {openContract, setOpenContract, Id} = useContext(ChatContext)

    const {user, setUser} = useContext(AuthContext)
    const {data, isLoading} = useQuery(["getContractdetails"],()=>{
        return axios.get("http://localhost:3000/chats/getcontractdetails/"+Id)
      })
    
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
    }, [])

    useEffect(()=>{
        setData(data?.data?.data)
    },[data])

    const {mutate, isLoading:isAcceptLoading, isSuccess} = useMutation(()=>{
        return axios.post("http://localhost:3000/influencer/acceptcontract/"+Data["_id"])
    })
    return <InfluencerGenaricModel>
  <div className="h-full flex flex-col justify-start ">
        <div className='flex justify-end bg-slate-200 '>
        <CloseIcon onClick={()=>{
          setOpenContract(false)
        }} className=" hover:bg-slate-100"></CloseIcon>
        
        </div >
        

        <div className="px-5 flex justify-between">
            <div>
            <h1 className='text-xl text-gray-900 font-railway'>Contract Details</h1>
            <p className='text-sm text-gray-500 font-railway'>Enter Contract details to set up the contract between the you and influencer</p>
            
            </div> 
            <div>
                
                <h1 className='border-green italic text-green'>{(!Data?.accepted && !Data?.rejected)?"Pending":null}</h1>
                <h1 className='border-green italic text-green'>{(Data?.accepted && !Data?.rejected)?"accepted":null}</h1>
                <h1 className='border-green italic text-green'>{(!Data?.accepted && Data?.rejected)?"rejected":null}</h1>
            </div>  
        </div>
        <div className='flex-1 justify-start h-full px-5 mt-4  overflow-y-auto'>
            <div className="space-y-5 mb-3">
                <h1 className='text-2xl font-railway '>{Data?.campaignId?.title}</h1>
                <p className='text-sm text-gray-600'>{Data?.campaignId?.description}</p>
            </div>
            <div className='spa'>
                <h1 className='text-2xl font-railway '>Brand Information</h1>
                <h1 className='text-xl text-gray-600'>{Data?.sender?.name}</h1>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault()
                mutate()

            }} className='flex flex-col  space-y-3'>
                <div className='flex justify-between w-[50%]'>
                <div>
                    <h1 className='text-xl font-railway'>Contract Amount</h1>
                    <h2 className='text-xl font-railway text-gray-700'>{Data?.amount}</h2>
                </div>
                <div>
                    <h1 className='text-xl font-railway'>End Date</h1>
                    <h1 required className="bg-slate-100 rounded-full px-2" >{Data?.expiresAt}</h1>
                    
                   
                </div>
                </div>
                <div className='flex h-56 '>
                {user?.role ==='brand'? null:<button type='submit' className='bg-blue px-2 py-1 hover:opacity-80 shadow-lg h-[50px] text-white font-railway rounded-full'>Accept Contract 
                
                {isAcceptLoading?<TailSpin
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                />:null}</button>  
 }                
                </div>
            </form>
            
              
        </div>
        </div>        
    </InfluencerGenaricModel>
}

const ChatContainer = () => {
    const {user, setUser} = useContext(AuthContext)
    const {currentUser, openContract, socket} = useContext(ChatContext)
    const [message, setMessage] = useState("")
    const [fileUpload, setFileUpload] = useState(null)
    const[disable, setdisable] = useState(false)
    const [Fileurl, setUrl] = useState("")
    const[isUploaded, setUpload] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [messages, setMessages] = useState([])
    const [arrivalMessages, setArrivalMessages] = useState(null)
    const [status, setStatus] = useState("offline")

    const scrollRef = useRef()
    const handleMessageChange=(e)=>{
        setUpload(false)
        setMessage(e.target.value)
        
    }
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
        console.log("this is the socket",socket)
      },[])

    useEffect (()=>{
        const fetchMessages = async ()=>{
            if(Object.keys(currentUser).length !==0){
                const response = await axios.post("http://localhost:3000/chats/getMessages",{
                
                to: currentUser["_id"],
                from: user["_id"]
            
                })
                setMessages(response?.data?.projectMessages)
            }

        }
        fetchMessages()
        if(socket.current){
            socket.current.emit('checkOnline', currentUser["_id"])
            socket.current.on("userOnline", (text)=>{
                
                if(text === "online")
                    setStatus(text)
                else
                    setStatus(text)
            })
            socket.current.on('offlineTime', time=>{
                console.log("the offline time is",time)
            })
        }


    },[currentUser])

    useEffect(()=>{
        
        if(socket.current){
           
            socket.current.on("msg-recieve", (msg)=>{
                console.log("msg is ", msg)
                setMessages([...messages,{
                    fromSelf:false,
                    message:msg
                }])
            })

            
        }

    },[])
     
    
    // useEffect(()=>{
    //     scrollRef.current?.scrollIntoView({behaviou: 'smooth'})
    // }, [messages])

    useEffect(()=>{
        const handleTabClose = (e)=>{
            if(socket.current){
                socket.current.emit("logout", user?._id)
            }
        }
        window.addEventListener('beforeunload', handleTabClose);
        return ()=>{
            window.removeEventListener('beforeunload', handleTabClose);
        }
    })

    const handleFileUpload = (fileUpload)=>{
        console.log(fileUpload.name)
        
        const fileRef = ref(storage, `files/${fileUpload.name+ v4()}` )
        
        setUploading(true)
        uploadBytes(fileRef,fileUpload).then(()=>{
            console.log("uploading the files in the db")
            
            getDownloadURL(fileRef).then((url)=>{
                alert("file is uploaded")
                console.log("this is the file reference")
                
                setUrl(url)
                console.log(uploading)
                setUploading(false)
                setUpload(true)
                console.log("file",Fileurl)

            })
            
        }).catch((e)=>{
            console.log(e)
        })
    }

    // const {data, isLoading} = useQuery(["getAllMessages"], ()=>{
    //     if(Object.keys(currentUser).length !== 0 )
    //     console.log(currentUser["_id"])
    //     return axios.post("http://localhost:3000/chats/getMessages",{
            
    //             to: currentUser["_id"],
    //             from: user["_id"]
            
    //     })
    // },{
    //     refetchInterval: 100000
    // })
    const {mutate} = useMutation(()=>{
        console.log(socket, "the socket is")
        socket.current.emit("send-msg", {
            to: currentUser._id,
            from: user._id,
            text: message
        })
        // socket.on("recieve-msg",(data)=>{
        //     const allMessages = [...data.data.projectMessages]
        //     allMessages.push({
        //         fromSelf : true,
        //         text: message
        //     })

        // })
        
        
        console.log("in mutation", message)
        var text = message
        setMessage("")
        setMessages([...messages, {
            message: text,
            fromSelf: true
        }])
        if(Object.keys(currentUser).length !== 0){
            console.log("innn")
            if(Fileurl === ""){
                setUrl("")
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
                
                setUpload(false)
                const msg = {
                    text: Fileurl,
                    users:[
                        currentUser["_id"],
                        user["_id"]
                    ],
                    sender: user["_id"]
        
                }
                setUrl("")
                console.log("ye yaha nhi chal rha hai", Fileurl)
                return axios.post("http://localhost:3000/chats/addMessage",
                msg
        
        )
            }

            
    }
    
    
    }

    
    
    )
  return (
    <>
    {openContract && <ContractModel></ContractModel>}
    {Object.keys(currentUser).length === 0?<FallBack/>:
    <div className='flex flex-col flex-1  shadow-inner my-0 bg-white'>
        <div className='flex flex-col shadow-md w-[100%] px-5 py-2 '>
            <h1 className='text-sm text-black font-railway'>{currentUser?.name}</h1>
            <p className={status === "online"?"text-xs text-blue-600": "text-xs text-green-500"}>{status}</p>
        </div>
    
        <div className=' flex-col  overflow-y-auto  w-full h-[68vh] px-6'>
        
        {messages.map(msg=>{
            
            return (<div className={msg?.fromSelf===true?"flex justify-end my-1":"justify-start my-1"}>

              
            {msg?.msgType=== "contract"? <div className={msg?.fromSelf===true?" text-white max-w-[50%] rounded-full my-1 px-4 py-1":"text-black max-w-[50%] rounded-full my-2 px-4 py-1"}><Contract id={msg?.id} text={msg?.msgType}/></div>:
             
             <div className='flex '>
                {console.log(msg)}
                <img src={msg?.sender?.photo} alt="tomatoes are disgusting" className="w-[30px] h-[30px] rounded-full object-cover"/>
                <div className="flex flex-col justify-start">
                    <div>
                        <h1>{msg?.sender?.name}</h1>
                        <p>{msg?.date}</p>
                    </div>
                    <h1 ref={scrollRef} className={msg?.fromSelf===true?" text-gray-700 max-w-[50%] bg-blue rounded-full my-1 px-4 py-1":"text-black max-w-[40%] bg-slate-200 rounded-full my-2 px-4 py-1"}>{msg?.message}</h1>
            
                </div>     
             </div>
            }
         </div>)
            
        })}
    </div>
    
    <div>
    <div className='flex items-center shadow-md px-5   space-x-2'>
        <label htmlFor='fileInput'  className='text-grey text-xs hover:bg-gray-300 '>
        <AttachFileIcon/></label>
        <input 
        className='hidden'
        id='fileInput'
        
        onChange={(e)=>{
            setdisable(true)
            setFileUpload(e.target.files[0])
            
           handleFileUpload(e.target.files[0])
        }} type="file"></input>
        <input
        disabled={disable} 
        value={message}
        size='small'
        placeholder='send message ...' 
        className='border px-3 text-sm w-[100%] '
        sx={{
            width: "70%",
            borderRadius: 200
        }}
        onChange={(e)=>{
           handleMessageChange(e)
        }}
        ></input>
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
    
      
    </div>
    
    
</div>
    }
    </>
  )
}

export default ChatContainer