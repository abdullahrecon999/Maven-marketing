import React, {useEffect, useState} from 'react'
import InfluencerGenaricModal from '../InfluencerComponents/InfluencerGenaricModal'
import CloseIcon from '@mui/icons-material/Close';
import {useQuery, useMutation} from "react-query"
import axios from "axios"
import DatePicker ,{CalendarContainer}from "react-datepicker"

const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>
            What is your favorite day?
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
const ContractModel = ({handleClose, id}) => {
    const [bidData, setData] = useState({})
    const [startDate, setStartDate] = useState(new Date());
    const [amount, setAmount] = useState(0)
    const {data} = useQuery(["getbiddetails"],()=>{
        return axios.get(`http://localhost:3000/brand/getbiddetails/${id}`)
    })

    const {mutate} = useMutation(()=>{
        if(Object.keys(bidData).length !==0){
            const val = {
                campaignId: bidData?.campaignId["_id"] ,
                to: bidData?.sender["_id"],
                sender: bidData?.campaignId?.brand,
                accepted: false,
                amount: amount,
                expiresAt: startDate
            }
            console.log(val)
            return axios.post("http://localhost:3000/brand/createContract",val)
        }
    })
    useEffect(()=>{
        setData(data?.data?.data)
    },[data])
  return (
    <InfluencerGenaricModal>
        <div className="h-full flex flex-col justify-start ">
        <div className='flex justify-end bg-slate-200 '>
        <CloseIcon onClick={()=>{
          handleClose()
        }} className=" hover:bg-slate-100"></CloseIcon>
        
        </div >
        

        <div className="px-5">
            <h1 className='text-xl text-gray-900 font-railway'>Contract Details</h1>
            <p className='text-sm text-gray-500 font-railway'>Enter Contract details to set up the contract between the you and influencer</p>
        </div>
        <div className='flex-1 justify-start h-full px-5 mt-4  overflow-y-auto'>
            <div className="space-y-5 mb-3">
                <h1 className='text-2xl font-railway '>{bidData?.campaignId?.title}</h1>
                <p className='text-sm text-gray-600'>{bidData?.campaignId?.description}</p>
            </div>
            <div className='spa'>
                <h1 className='text-2xl font-railway '>Influencer Information</h1>
                <h1 className='text-xl text-gray-600'>{bidData?.sender?.name}</h1>
            </div>
            <form className='flex flex-col '>
                <div className='flex'>
                <div>
                    <h1 className='text-xl font-railway'>Contract Amount</h1>
                    <input required className="bg-slate-100 rounded-full px-2" onChange={(e)=>{
                        setAmount(e.target.value)
                    }} type="number"placeholder='Enter amount'></input>
                </div>
                <div>
                    <h1 className='text-xl font-railway'>End Date</h1>
                    <DatePicker required className="bg-slate-100 rounded-full px-2" onChange={(date) => setStartDate(date)}
                    
                    selected={new Date()}/>
                </div>
                </div>
                <div className='flex h-56 justify-end'>
                    <button type='submit' onClick={mutate} className='bg-blue px-2 py-1 h-[50px] text-white font-railway rounded-full'>create contract</button>  
                </div>
            </form>
            
              
        </div>
        </div>
    </InfluencerGenaricModal>
  )
}

export default ContractModel