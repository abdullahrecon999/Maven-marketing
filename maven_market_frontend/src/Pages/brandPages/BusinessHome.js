import React ,{useState} from 'react'
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

const campaigns = [{
  title: "campaign 1",
  disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  platforms:[
    "twitter",
    "facebook",
    "instagram",
    "redit",
    "pinterest"
  ]

},
{
  title: "campaign 1",
  disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  platforms:[
    "twitter",
    "facebook",
    "instagram",
    "redit",
    "pinterest"
  ]

},
{
  title: "campaign 1",
  disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  platforms:[
    "twitter",
    "facebook",
    "instagram",
    "redit",
    "pinterest"
  ]

},
{
  title: "campaign 1",
  disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  platforms:[
    "twitter",
    "facebook",
    "instagram",
    "redit",
    "pinterest"
  ]

},
{
  title: "campaign 1",
  disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  platforms:[
    "twitter",
    "facebook",
    "instagram",
    "redit",
    "pinterest"
  ]

},
{
  title: "campaign 1",
  disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  platforms:[
    "twitter",
    "facebook",
    "instagram",
    "redit",
    "pinterest"
  ]

}]

const Menus = [
  { title: "Dashboard", src: <DashboardIcon/> },
  { title: "Inbox", src: <MailIcon/> },
  { title: "Accounts", src: <AccountBoxIcon/>},
  { title: "Schedule ", src: <ScheduleIcon/> },
  { title: "Campaigns", src:<CampaignIcon/>  },
  { title: "Analytics", src: <AnalyticsIcon/> },
  
  { title: "Setting", src: <SettingsIcon/> },
];
const BusinessHome = () => {
  const [open, setOpen] = useState(true)
  const [notifications, setNotification] = useState(true)
  const { width, height, scrollX, scrollY } = useViewportState();
  console.log(width)
  return (
    <div className='flex '>
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
      <div className='flex  flex-col pl-16 py-6 md:pl-0 w-[100%]'>
            
        <div className='flex justify-between  w-[100%] pr-10 pl-2 md:pl-4 pr-16'>
          <h1 className='font-railway text-grey text-sm'>Dashboard</h1>
          <div className='flex'>
            <div >
            <input className='border' placeholder='search.....'></input>
            <Button><SearchIcon className='text-sm'></SearchIcon></Button>
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
            <div className='border flex  flex-col justify-center items-center py-10 px-16 border-spacing-y-5 drop-shadow-sm md:w-[600px] hover:drop-shadow-2xl'>
              
              <h1 className='font-Andika text-xl text-green'>Show a graph here</h1>
            </div>

          </div>
          <div className=' px-6 pt-4'>
            <div className='flex flex-col space-y-1 px-4 py-1 border'>
              <div className='flex justify-between space-x-1 px-4 py-2 border rounded-sm bg-gray-100'>
                <h1 className='text-sm font-railway md:text-base'>Campaigns</h1>

                <div>
                <FilterAltIcon className='hover:text-blue'/>
                <input placeholder='Search.....' className='rounded-full'></input>
                <SearchIcon className="hover:text-blue"/>
                </div>
              </div>
              <div className='flex flex-col space-y-2 px-6 py-4'>
                {campaigns.map(items=> {return (<div className='flex flex-col space-y-2'>
                <h1 className='font-railway text-blue' >{items.title}</h1>
                <p className='font-Andika text-black text-xs'>{items.disc}</p>
                <ul className='flex flex-wrap  md:w-[400px]'>
                  {items.platforms.map(platform=> {
                    return (<li className='font-Andika text-white px-2 py-1 mr-1 mb-2 rounded-full text-xxs w-[80px] bg-green text-center'>{platform}</li>
                    )
                  })}
                  

                </ul>
                <hr></hr>

              </div>)})}
              

              </div>
            </div>
            
          </div>



            
      </div>
    </div>
  )
}

export default BusinessHome