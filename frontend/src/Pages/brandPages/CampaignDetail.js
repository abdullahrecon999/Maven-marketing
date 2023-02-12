import React, {useEffect} from 'react'
import SideBar from './SideBar'
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FormTextField2 from "../../Components/FormTextFeild2"
import FormSelect2 from "../../Components/FormSelect2"
import { TextField , MenuItem, Button} from '@mui/material';
import campaingSchema from '../../ValidationSchemas/campaignSchema';
import Textarea from '../../Components/Textarea';
import Influencer from './Influencer';
import { useNavigate, useLocation } from 'react-router-dom';

const CampaignDetail = () => {

    const {state} = useLocation();
    const { title, description, platform } = state.items;

    useEffect(() => {

        axios.post("http://localhost:3000/users/keywords", {description: description} , {
            headers: {
                'Content-Type': 'application/json'
                },
            withCredentials: true
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [description])

  return (
    <div className='flex h-screen'>
        <SideBar></SideBar>
        <div className=' flex flex-col md:flex-row w-[100%]'>
        <div className= 'flex  flex-col pl-16 py-12 md:pl-0 w-[100%]'>
        <div className='flex justify-between  w-[100%] pr-10 pl-2 md:pl-4 md:pr-16'>
          <h1 className='font-railway text-grey text-sm'>Campaign Details</h1>
           <NotificationsIcon></NotificationsIcon>
          </div>
          <div className='flex flex-col px-6 mt-5 space-y-3'>
            <div>
                <h1 className='font-railway text-blue text-base md:text-xl '>Here are your campaing details</h1>
                <p className='font-railway text-grey text-xs'></p>
                
            </div>
            
            <div>
                <h1 className='font-railway text-base md:text-lg'>Campaign Title</h1>
                <h1 className='font-railway text-sm text-grey md:text-base'>{title}</h1>
            </div>
            <div>
                <h1 className='font-railway text-base md:text-lg'>Campaign Description</h1>
                <h1 className='font-railway text-sm text-grey md:text-base' >{description}</h1>
            </div>
           
            <div>
                <h1 className='font-railway text-base md:text-lg'>Platforms</h1>
                <p className='font-railway text-sm text-grey md:text-base'>{platform}</p>
            </div>
            <div>
                <h1 className='font-railway text-xs md:text-sm'>Status</h1>
                {/* <FormSelect2 name = "platform"   data= {platforms}></FormSelect2>          */}
                <p className='font-railway text-sm text-green md:text-base'>open</p>
            </div>
            <div>
                <h1 className='font-railway text-xs md:text-sm'>Hires</h1>
                {/* <FormSelect2 name = "platform"   data= {platforms}></FormSelect2>          */}
                <p className='font-railway text-sm text-grey md:text-base'>No influencer is hired yet</p>
                
            </div>
           
           
        </div>
        </div>
        <div className=' pt-28 pr-12'>
            <div className='border-slate-100 border overflow-y-scroll h-[80%] w-[300px] px-4 rounded-lg'>
            <h1 className='mt-3 font-railway text-base'>
                Suggested influencer for you
                <Influencer></Influencer>
                <Influencer></Influencer>
                <Influencer></Influencer>
                <Influencer></Influencer>
                <Influencer></Influencer>
                <Influencer></Influencer>
                <Influencer></Influencer>
                <Influencer></Influencer>
            </h1>
            </div>

        </div>
        </div>
        
    </div>
  )
}

export default CampaignDetail