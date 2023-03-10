import React, {useState, useCallback} from 'react'
import BidsTable from './table'
import Search from "./Search"
import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import { AuthProvider} from "../../utils/authProvider"
import InfluencerGenaricModal from './InfluencerGenaricModal'
import CloseIcon from '@mui/icons-material/Close';
import DetailBox from './DetailBox'
import {Link} from "react-router-dom"
import PageviewIcon from '@mui/icons-material/Pageview';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Campaign Title',
    width: 150,
    
  },
  {
    field: 'Brand Name',
    headerName: 'brandName',
    width: 150,
    
  },
  {
    field: 'submittedAt',
    headerName: 'Submitted At',
    type: 'number',
    width: 110,
    
  },
  {
    field: 'Status',
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
  if (isLoading){
    return (<div>
      isloading
    </div>)
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
        <h1 className='text-xl md:2xl text-black font-railway'>Invite Details</h1>
        <hr></hr>
        <div>
          
          <h1 className='text-base text-black font-railway '>{bidDetails?.data?.data?.to?.name}</h1>
          
        </div>
        <div>
          <p className='text-xl text-black font-railway '>{bidDetails.data.data.campaignId.title}</p>
        </div>
        <p className="text-xl text-grey">{bidDetails.data.data.discription}</p>
        <div>
          <h1 className='text-black font-railway text-base'> Recieved At</h1>
          <DetailBox text={bidDetails.data.data.createdAt}></DetailBox>
        </div>
        <Link to="/campaigndetails" state={{id: "64078565f1116ce68f3aff06", invite: true}}>
            <h1 className='text-white bg-blue text-xl text-center font-railway border rounded-full py-1 px-2 hover:bg-indigo-500 shadow-lg'><PageviewIcon></PageviewIcon>View Campaign</h1>
        </Link>

        <hr></hr>
        <div className='flex space-x-3 px-4'>
            <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Accept</button>
            <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Decline</button>
        </div>
        
      </InfluencerGenaricModal>
  )
}
const Bids =()=>{
    const {query, setQuery} = useState("")
    
    const [close, setClose] = useState(false)
    const [id, setId] = useState("");
    const {isLoading, data:bids, isError, isSuccess} = useQuery(["getbids"],
    ()=>{
      return axios.get(`http://localhost:3000/influencer/myBids/63ea542b0938801f883fa8ab`,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
  )

  const data= bids?.data.data.map((item,i)=>{
    return {
      id: item["_id"],
      title: item?.campaignId?.title,
      brandName: item?.to.name,
      
      submittedAt: item?.submitted,
      status: "Pending"

    }
  })


    const handleSetSearch = (value)=>{
    setQuery(value)
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
    if(isLoading){
      return (<div> loading</div>)
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
            <h1 className='text-xl self-start md:text-2xl text-black font-railway mb-1 pl-4' >Invites</h1>
            <p className='text-sm self-start text-grey mb-6 pl-4 md:text-base'> All the invites that you recieve are displayed here. Accept the invites to collaborate in the campaign</p>
            </div>
            <div className='px-4'>
            <Search handleSetSearch={handleSetSearch}/>
            </div>

        </div>
        
        <BidsTable rows={data} onOpen={handleOpen}></BidsTable>
        
        
    </div>
        </>
        }
    </div>)
}
const InfluencerInvites = () => {
  return (
    <>
    {true && <Bids/>}
    </>
  )
}

export default InfluencerInvites