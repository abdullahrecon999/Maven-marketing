import React, {useState, useEffect, useContext} from 'react'
import BidsTable from './table'
import Search from "./Search"
import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import { AuthContext} from "../../utils/authProvider"
import InfluencerGenaricModal from './InfluencerGenaricModal'
import CloseIcon from '@mui/icons-material/Close';
import DetailBox from './DetailBox'
import Loader from './Loader'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Campaign Title',
    width: 150,
    
  },
  {
    field: 'brandName',
    headerName: 'Brand Name',
    width: 150,
    
  },
  {
    field: 'submittedAt',
    headerName: 'Submitted At',
    
    width: 110,
    
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
  }
];

const Initialbids = ()=>{
    return (<div className=' px-[20%]'>
        <div className=' flex flex-col justify-center items-center rounded-t-lg border-2 h-[60vh] border-blue'>
            <h1 className='text-xl md:text-4xl text-black font-railway' >Oppps! so Empty</h1>
            <p className='text-base text-center md:text-xl text-blue font-railway'>Go the the campaigns and place some bids</p>
        </div>
    </div>)
}

const Modal = ({onClose, id})=>{

   
    
    const {isLoading, data:bidDetails, isError, isSuccess} = useQuery(["getbidDetails"],
    ()=>{
      return axios.get(`http://localhost:3000/influencer/bidDetails/${id}`,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
  )
  const handleClose= ()=>{
    onClose()
  }
  

  if (isError){
    return (<div>
      errorr
    </div>)
  }
  return (
    <InfluencerGenaricModal>
      
        <CloseIcon onClick={()=>{
          handleClose()
        }} className="self-end hover:bg-slate-100"></CloseIcon>

        {isLoading?<Loader title="Please Wait" subtitle="bid details are being loaded"/>:
          <>
          <h1 className='text-xl md:2xl text-blue font-railway'>Bid Details</h1>
          <div>
            {console.log(bidDetails.data.data)}
            <h1 className='text-base text-black font-railway '>Brand Name</h1>
            
            <p className="text-xl text-black ">{bidDetails?.data?.data?.to?.name}</p>
          </div>
          <div>
            <h1 className='text-xl text-black font-railway'>Title</h1>
            <p className='text-grey'>{bidDetails.data.data.campaignId.title}</p>
          </div>
          <p className='text-xl font-light'>{bidDetails.data.data.discription}</p>
          <div className='w-[50%]'>
            <h1 className='text-green font-railway'> Submitted at</h1>
            <DetailBox  text={bidDetails.data.data.createdAt}></DetailBox>
          </div>
          </>
        }
        
      </InfluencerGenaricModal>
  )
}
const Bids =()=>{
    const {query, setQuery} = useState("")
    const [data, setData] = useState({})
    const [close, setClose] = useState(false)
    const [id, setId] = useState("");
    const {user, setUser} = useContext(AuthContext)

    
    const {isLoading, data:bids, isError, isSuccess, status} = useQuery(["getbids"],
    ()=>{
      console.log(user["_id"])
      return axios.get(`http://localhost:3000/influencer/myBids/${user["_id"]}`,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
  )

 

  useEffect(()=>{
    console.log(user)
    if(isSuccess){
      const data= bids?.data.data.map((item,i)=>{
  
        return {
          id: item["_id"],
          title: item?.campaignId?.title,
          brandName: item?.to.name,
          
          submittedAt: item?.updatedAt,
          status: "Pending"
    
        }
      })
      
      setData(data)
    }
  },[bids?.data?.data, isSuccess])
  


    const handleSetSearch = (value)=>{
    setQuery(value)
    console.log(query)
    } 

    const handleOpen =(id)=>{
      setId(id);
      setClose(true)

    }
    
    const search = ()=>{
        
    }

    const handleClose=()=>{
        setClose(!close)
    }
    

    if(isError){
      return (<div>error</div>)
    }
    return (<div className=' px-[10%]'>
      {close && <Modal onClose={handleClose} id={id} onOpen={handleOpen}/>}
      
        {!close &&
        <>
        <div className=' flex flex-col items-center rounded-t-lg border-2 min-h-[60vh] py-5 border-blue shadow-2xl'>
        <div className="flex flex-col items-start mb-2 md:flex-row">
            <div >
            <h1 className='text-xl self-start md:text-2xl text-black font-railway mb-1 pl-4' >Your Bids here</h1>
            <p className='text-sm self-start text-grey mb-6 pl-4 md:text-base'> All of the bids that you submitted and aare pendeling approval are displayed here</p>
            </div>
            <div className='px-4'>
            <Search handleSetSearch={handleSetSearch}/>
            </div>

        </div>
          
        <></>
        {isLoading&& !isSuccess?<Loader
          title="Loading your Bids"
        />: <>
        {data === "undefined"?null:<BidsTable rows={data} onOpen={handleOpen} columns={columns}></BidsTable>}
        </>}
        
        
        
        
    </div>
        </>
        }
    </div>)
}
const InfluencerBids = () => {
  return (
    <>
    {true && <Bids/>}
    </>
  )
}

export default InfluencerBids