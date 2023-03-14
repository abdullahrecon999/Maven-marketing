import React, {useState, useEffect} from 'react'
import BidsTable from './table'
import Search from "./Search"
import {useQuery, useMutation} from "@tanstack/react-query"
import axios from "axios"
import { AuthProvider} from "../../utils/authProvider"
import InfluencerGenaricModal from './InfluencerGenaricModal'
import CloseIcon from '@mui/icons-material/Close';
import DetailBox from './DetailBox'
import {Link} from "react-router-dom"
import PageviewIcon from '@mui/icons-material/Pageview';
import { LineWave } from 'react-loader-spinner'
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

   
    
    const {isLoading, data:bidDetails, isError, isSuccess, status} = useQuery(["getInvites"],
    ()=>{
      return axios.get(`http://localhost:3000/influencer/invites/detail/${id}`,
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

  const handleInviteAccept = (id)=>{
      return  axios.post(`http://localhost:3000/influencer/invite/accept/${id}`, {
        accepted: true,
        rejected: false
      },
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
  }

  const handleDeclineAccept = (id)=>{
    return  axios.post(`http://localhost:3000/influencer/invite/reject/${id}`, {
      accepted: false,
      rejected: true
    },
    {headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  })
}

const {mutate, isLoading:isAccepting} = useMutation(handleInviteAccept)
 if(isLoading){
  return (<div>
    loading
  </div>)
 }

  if (isError){
    return (<div>
      errorr
    </div>)
  }
  return (
    <InfluencerGenaricModal>
      {console.log(bidDetails.data.data)}
        <CloseIcon onClick={()=>{
          handleClose()
        }} className="self-end hover:bg-slate-100"></CloseIcon>
        <h1 className='text-xl md:2xl text-black font-railway'>Invite Details</h1>
        <hr></hr>
        
        <div>
          <p className='text-xl text-black font-railway '>{bidDetails.data.data.campaignId.title}</p>
        </div>
        <p className=" text-grey text-base">{bidDetails.data.data.campaignId.description}</p>
        <div>
          <h1 className='text-black font-railway text-base'> Recieved At</h1>
          <DetailBox text={bidDetails.data.data.createdAt}></DetailBox>
        </div>
        <div>
          <h1 className='text-black font-railway text-base'> Plateforms</h1>
          {bidDetails.data.data.campaignId.platform.map(item=>{
            return  <DetailBox text={item} key={item}></DetailBox>

          })}
        </div>
        <div>
          <h1 className='text-black font-railway text-base'> Compensation</h1>
          <DetailBox text={bidDetails.data.data.campaignId.compensation}></DetailBox>

        </div>
        <Link to="/campaigndetails" state={{id: bidDetails.data.data.campaignId["_id"],inviteId: bidDetails.data.data["_id"], invite: true}}>
            <h1 className='text-white bg-blue text-xl text-center font-railway border rounded-full py-1 px-2 hover:bg-indigo-500 shadow-lg'><PageviewIcon></PageviewIcon>View Campaign</h1>
        </Link>

        <hr></hr>
        <div className='flex space-x-3 px-4'>
            <button onClick={()=>{

            }} className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Accept</button>
            <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Decline</button>
        </div>
        
      </InfluencerGenaricModal>
  )
}
const Bids =()=>{
    const [query, setQuery] = useState("")
    const [data, setData] = useState({})
    const [close, setClose] = useState(false)
    const [id, setId] = useState("");
    const {isLoading, data:bids, isError, isSuccess, status} = useQuery(["getinvites"],
    ()=>{
      return axios.get(`http://localhost:3000/influencer/getInvites/63ea4d4624f3dc0cd469dada`,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
  )

  useEffect(()=>{
    if(isSuccess){
      const data= bids?.data.data.map((item,i)=>{
        return {
          id: item["_id"],
          title: item?.campaignId?.title,
          brandName: item?.to.name,
          submittedAt: item?.submitted,
          status: "Pending"
    
        }
      })
      
      setData(data)
    }
  },[isSuccess, status])
  


    const handleSetSearch = (value)=>{
      
      setQuery(value)

    } 

    const handleOpen =(id)=>{
      setId(id);
      setClose(true)

    }
    
    // const search = ()=>{

    //   const filteredData = data.filter((item)=>{
    //     return(item.includes(query.toLowerCase()))
    //   })
        
    // }

    const handleClose=()=>{
        setClose(!close)
    }
    


    if(isError){
      return (<div>error</div>)
    }
    return (<>
    {data.length <= 0?<Initialbids/>:
    <div className=' px-[10%]'>
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
      
      {isLoading&& !isSuccess?<Loader
        title="Loading your Bids"
      />: <>
      {data === "undefined"?null:<BidsTable rows={data} onOpen={handleOpen} columns={columns}></BidsTable>}
      </>}
      
      
  </div>
      </>
      }
  </div>
    }
    </>)
}
const InfluencerInvites = () => {
  return (
    <>
    {true && <Bids/>}
    </>
  )
}

export default InfluencerInvites