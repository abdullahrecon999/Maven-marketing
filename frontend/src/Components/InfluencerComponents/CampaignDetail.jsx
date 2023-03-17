import React ,  {useState}from 'react'
import { useLocation } from 'react-router-dom'
import {useQuery} from "react-query"
import axios from "axios"
import HelpIcon from '@mui/icons-material/Help';
import BidModal from './BidModal';
import Loader from './Loader';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Detail = ({text})=>{
  return (<h1 className='px-2 text-center py-1 rounded-full  text-grey border border-grey'>
    {text}
  </h1>)
}

const CampaignQuestions = ({text, i})=>{
  return (<h1 className='border-b-2 py-2 px-3 w-[100%] text-black font-railway text-base'><HelpIcon></HelpIcon> {i+1}. {text}</h1>)
}
const CampaignDetailInfluencer = () => {
  const {state} = useLocation()
  const [open, setOpen] = useState(false)
  

  const handleClose = ()=> {
    setOpen(!open)
  }

  const handleOpen = ()=> {
    setOpen(!open)
  }
  console.log(state.id)

  const {isLoading, data, isError, isSuccess} = useQuery(["getCampaignDetails"],
    ()=>{
      return axios.get(`http://localhost:3000/campaign/campaigns/details/${state.id}`,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
  )

  
  if(isLoading){
    return(<div className='h-screen flex justify-center items-center'>
      <Loader title="Please wait" subtitle="Campaign details are being loaded"/>
    </div>)
  }

  if (isError){
    return (
      <div> errorrr</div>
    )
  }
  return (
    
    <div className='relative container mx-auto my-16'>
    {state?.invite && <div className='fixed w-[100%] bg-white shadow-xl flex justify-end items-center -mx-5 px-9 py-4 space-x-1'>
      
        <h1 className='text-base text-grey '>Accept or decline the invite?</h1>
        <div className='flex space-x-3 px-4'>
            <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Accept</button>
            <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Decline</button>
        </div>
    </div>}
      
      {open && <BidModal data = {data.data.data.questions} brand={ data.data.data.brand["_id"]} id={data.data.data["_id"]} onClose={handleClose}></BidModal>}
        <div className='flex flex-col space-y-4'>
          <div className="flex space-x-2 rounded-3xl shadow-md">
              <div className='flex bg-gradient-to-r from-blue rounded-l-3xl to-green w-[65%] h-[55vh] bg-red-500 place-items-end pl-5 pb-4'>
                  <h1 className='text-white text-4xl font-railway'>{data.data.data.title} </h1>
              </div>
            
              <div className='h-[55vh] '>
                  <img className="object-fill w-[100%] h-[100%] rounded-r-3xl" src={data.data.data.bannerImg} alt={data.data.data.banner}></img>
              </div>

          </div>
          <div className='flex '>
            <div className='flex flex-1 flex-col space-y-2'>
              <h1 className="text-black text-xl font-railway">Work with {data.data.data.brand?.name}</h1>
              <div>
                <p className='text-lg text-grey font-railway font-thin'>
                  {data.data.data.description}
                </p>
                <div className='flex flex-col'>
                  
                  <h1 className='text-xl text-black font-railway'>Required Platforms</h1>
                  <div className='flex w-[70%] flex-wrap space-x-1 pt-2'>
                  
                    {data?.data?.data?.platform.map(items=>{
                      return <Detail text= {items}></Detail>
                    })}
                  </div>
                  </div>

                
              </div>
              <div className='flex  flex-col md:w-[40%] md:flex-row md:justify-between '>
                <div className='space-y-2'>
                  <h1 className='text-xl text-black font-railway'>
                    Due By
                  </h1>
                  <Detail text={data.data.data.deliveryDate}/>
                </div>
                <div className='space-y-2'>
                  <h1 className='text-xl text-black font-railway'>
                    Compensation
                  </h1>
                  <Detail text="Cash"/>
                </div>



              </div>
              <div className='flex flex-col md:w-[60%] space-y-2'>
              <h1 className='text-xl text-black font-railway'>Information Requests</h1>
              <p className='text-base text-grey font-semibold'>Additional information lets brand know if you are a best fit for the campaign</p>
                <div className='flex flex-col items-start space-y-3 p-6 border rounded-3xl shadow-md'>
                      {data?.data?.data?.questions.map((items, i)=>{
                        return (<CampaignQuestions text={items} i={i}></CampaignQuestions>)
                      })}
                </div>
              </div>
            </div>

            <div className='hidden md:flex flex-[0.1]    mr-2'>
              <div className='flex flex-col items-center  px-4 py-6 w-[300px] h-[160px] border shadow rounded-lg space-y-3'>
                <p className='text-grey text-base text-center '>If this campaign interests you then submit a bid to collaborate</p>
                <button onClick={()=> handleOpen()}  className='bg-blue text-center text-white font-railway py-2 px-3 rounded-full shadow hover:bg-indigo-600'>I'd like to submit a pitch</button>
              </div>
            </div>

          </div>
          <button onClick={()=> handleOpen()}  className='bg-blue text-center text-white font-railway py-2 px-3 rounded-full shadow hover:bg-indigo-600 md:hidden'> Submit a Bid</button>
          
          <div>
            <h1>Similar Campaigns</h1>
            

          </div>

        </div>

        

    </div>
  )
}

export default CampaignDetailInfluencer