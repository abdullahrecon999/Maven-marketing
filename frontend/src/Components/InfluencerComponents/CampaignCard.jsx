import React from 'react'
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import image from "../../images/mobile.jpg" 
const CardDate = ()=> {
    return (
      <div className='flex border rounded-xl space-x-2 px-2 py-1 '>
        
        <h2 className='text-xs font-railway text-grey'><CalendarMonthIcon></CalendarMonthIcon>11/11/11</h2>
      </div>
    )
  }
const CampaignCard = ()=>{
    return(<div className="flex flex-col border rounded-xl w-[100%] mt-2 h-[300px] mx-3 mb-2 md:w-[230px] shadow-xl hover:-translate-y-1 hover:shadow-2xl">
 
              <div className='flex p-3   space-x-4'>
                <CampaignIcon className=' text-4xl text-green'/>
                <div className='flex flex-col '>
                  <h1 className="font-railway text-base text-black">Campaign Name</h1>
                  <h1 className= "font-railwat text-sm text-grey">Work with brand Name</h1>
                </div>
              </div>
              <img src={image} alt="asjkshd" className="object-cover h-[54%] w-[100%] opacity-50 hover:opacity-100  "></img>
              {/* <div className='flex flex-col mt-1 '>
                <h4 className='text-xxs font-railway text-grey'>Category</h4>
                <h1 className='font-Andika text-white px-2 py-1 mr-1 mb-2 rounded-full text-xs w-[80px] bg-green text-center'>twitter</h1>
              </div> */}
              
              <div className='flex-start flex justify-between mx-3 pt-3 '>
                  
                  <CardDate></CardDate>
                  <AttachMoneyIcon className= "text-lg text-green"></AttachMoneyIcon>
              </div>
              
     </div>)
}
export default CampaignCard