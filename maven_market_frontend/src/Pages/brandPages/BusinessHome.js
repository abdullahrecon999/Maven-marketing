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
  return (
    <div className='flex'>
      <div  className={`bg-blue ${ 
          open ? "w-40 md:w-72" : "w-16 md:w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
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
            } md:text-xl `}
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
      <div className='flex-1 '>asdfg</div>
    </div>
  )
}

export default BusinessHome