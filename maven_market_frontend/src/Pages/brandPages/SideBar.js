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
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useViewportState from 'beautiful-react-hooks/useViewportState';
import campaigns from './campaigndata';
import CampaignComponent from './CampaignComponent';
const Menus = [
    { title: "Dashboard", src: <DashboardIcon/> },
    { title: "Inbox", src: <MailIcon/> },
    { title: "Accounts", src: <AccountBoxIcon/>},
    { title: "Schedule ", src: <ScheduleIcon/> },
    { title: "Campaigns", src:<CampaignIcon/>  },
    { title: "Analytics", src: <AnalyticsIcon/> },
    
    { title: "Setting", src: <SettingsIcon/> },
  ];
const SideBar = () => {
    const [open, setOpen] = useState(true)
    const [openDashboard,setOpenDashboar] = useState(true)
  const [openCampaigns, setOpenCampaigns] = useState(true)
 
    const { width, height, scrollX, scrollY } = useViewportState();
  return (
    <div  className={`z-10  bg-blue ${ 
        open ? "w-40 md:w-72" : "w-16 md:w-20 "
      } bg-dark-purple p-5  pt-8 ${width<786 ? "h-[100%]":" "} fixed  md:relative duration-300 `}>
      <ArrowBackIosNewTwoToneIcon className= {`text-white text-xl absolute cursor-pointer duration-100 -right-3 top-9 w-7 bg-green border-dark-purple
         border-2 rounded-full  ${!open && "rotate-180"}`}
         onClick={() => setOpen(!open)}></ArrowBackIosNewTwoToneIcon>
       <div className="flex gap-x-4 items-center">
        <MenuIcon
          src="./src/assets/logo.png"
          className={`text-white cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white font-railway origin-left font-medium duration-200 ${
            !open && "scale-0"
          } md:text-xl`}
        >
         Maven Marketing
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            onClick={(e)=>{
              if(e.currentTarget.textContent === "Dashboard")
              {
                setOpenDashboar(true)
                setOpenCampaigns(false)
              }
              else if(e.currentTarget.textContent === "Campaigns")
              {
                setOpenDashboar(false)
                setOpenCampaigns(true)
              }
              console.log(e.currentTarget.textContent)
            }}
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            {Menu.src}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar