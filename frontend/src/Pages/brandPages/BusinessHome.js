import React ,{useState, useEffect, useContext} from 'react'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CampaignIcon from '@mui/icons-material/Campaign';
import ScheduleIcon from '@mui/icons-material/Schedule';
import useViewportState from 'beautiful-react-hooks/useViewportState';
import BusinessDashboard from './BusinessDashboard';
import Campaign from './Campaign';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import campaigns from './campaigndata';
import SideBar from './SideBar';
import axios from 'axios';

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
  const [open1, setOpen1] = useState(true)
  const [openDashboard,setOpenDashboar] = useState(true)
  const [openCampaigns, setOpenCampaigns] = useState(true)
  const [influencer, setInfluencer] = useState([])
  const [camp, setCamp] = useState([])
  const navigate = useNavigate()
  const { width, height, scrollX, scrollY } = useViewportState();
  const location = useLocation()

  const handleClick = (e)=> {
    if (e.currentTarget.currentTarget.textContent === "Dashboard"){
      console.log("hello")
    }
  }

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

  useEffect(() => {
    // get campaigns
  
    axios.get("http://localhost:3000/influencer/all")
    .then(res => {
      console.log("Data: ",res.data); 
      setInfluencer(res.data.data.users)
      setOpen(true)
    }).catch(err => {
      console.log(err);
      setOpen(false)
    })

  }, [])

  return (
    <div className='flex '>
      <SideBar></SideBar>
        {console.log("Open: ",open)}
        {console.log("data: ",camp)}
        <BusinessDashboard data={(!open)? (campaigns):(camp)} data2={influencer} ></BusinessDashboard>
    </div>
  )
}

export default BusinessHome