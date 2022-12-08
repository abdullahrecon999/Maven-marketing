import React from 'react'
import {useState} from 'react'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CampaignIcon from '@mui/icons-material/Campaign';
import ScheduleIcon from '@mui/icons-material/Schedule';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useViewportState from 'beautiful-react-hooks/useViewportState';
import campaigns from './campaigndata';
import CampaignComponent from './CampaignComponent';
import eng from "../../images/Engagement.png"
import InfluencerTable from './InfluencerTable';

const BusinessDashboard = ({data}) => {
    const [notifications, setNotification] = useState(true)
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(true)
   
    const handleChange = (e)=> {
      
    }

    const handleSearch = ()=> {
      setShow(!show)
        console.log(search)
      
    }
  return (
    <div className='flex  flex-col pl-16 py-6 md:pl-0 w-[100%]'>
            
          <div className='flex justify-between  w-[100%] pr-10 pl-2 md:pl-4 pr-16'>
          <h1 className='font-railway text-grey text-sm'>Dashboard</h1>
            <div className='flex'>
              <div >
            <Button onClick={handleSearch} className="text-xs">See Available Influencers</Button> 
                
                {/* <TextField size='small' className='border' onChange={e=> handleChange(e)} placeholder='search.....'></TextField>
                <Button onClick={handleSearch}><SearchIcon className=''></SearchIcon></Button> */}
              </div>
              {notifications === true ? <NotificationsActiveIcon className= "animate-bounce text-gray-600 "/> : <NotificationsIcon/>}

            </div>
          </div>
          <div className='px-6 pt-6 space-y-5 md:flex md:space-y-0 md:space-x-8 '>
            <div className='border flex  flex-col justify-center items-center py-10 px-16 border-spacing-y-5 drop-shadow-sm hover:drop-shadow-2xl'>
              <div className='flex space-x-2'>
                <span className='font-railway text-black text-sm'>Campaigns</span>
                <HelpOutlineTwoToneIcon className='text-grey text-sm mt-1'></HelpOutlineTwoToneIcon>
              </div>
              <h1 className='font-Andika text-xl text-green'>100</h1>
            </div>
            <div className='border flex  flex-col justify-center items-center  border-spacing-y-5 drop-shadow-sm md:w-[600px] hover:drop-shadow-2xl'>
              <img className='h-[200px] w-[100%]' src= {eng}></img>
              {/* <h1 className='font-Andika text-xl text-green'>Show a graph here</h1> */}
            </div>

          </div>
          {show && <CampaignComponent ></CampaignComponent>}
          {!show && <InfluencerTable></InfluencerTable>}



            
      </div>
  )
}

export default BusinessDashboard