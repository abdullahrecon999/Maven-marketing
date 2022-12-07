import React, {useState} from 'react'
import CampaignComponent from './CampaignComponent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
const Campaign = () => {
    const [notifications, setNotification] = useState(true)
    const navigate = useNavigate()
  return (
    <div className='flex'>
      <SideBar></SideBar>
      <div className='flex  flex-col pl-16 py-6 md:pl-0 w-[100%]'>
        <div className='flex justify-between  w-[100%] pr-10 pl-2 md:pl-4 md:pr-16'>
          <h1 className='font-railway text-grey text-sm'>Campaings</h1>
            <div className='flex'>
              
                
            <Button onClick= {()=> navigate("/createCampaign")} >Create Campaign  <AddIcon></AddIcon></Button>
              
              {notifications === true ? <NotificationsActiveIcon className= "animate-bounce text-gray-600 "/> : <NotificationsIcon/>}

            </div>
          </div>
        <CampaignComponent></CampaignComponent>
    </div>
       </div>
  )
}

export default Campaign