import React, {useState, useEffect} from 'react'
import CampaignComponent from './CampaignComponent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import axios from 'axios'

const Campaign = () => {
    const [notifications, setNotification] = useState(true)
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const [camp, setCamp] = useState([])

    useEffect(() => {
      // get campaigns
      var users = localStorage.getItem("user");
      var email = JSON.parse(users).email;
    
      axios.post("http://localhost:3000/brand/campaigns", {email: email})
      .then(res => {
        if (res.data.length === 0){
          console.log("not found")
          setOpen(false)
        } else {
          console.log(res.data)
          setCamp(res.data)
          setOpen(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  
    }, [])

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
          <CampaignComponent data={camp} ></CampaignComponent>
    </div>
       </div>
  )
}

export default Campaign