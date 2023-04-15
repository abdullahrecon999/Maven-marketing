import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Typography from "@mui/material/Typography"
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
const style = {
    bgcolor: "white"
}

const Texts = ({title})=>{
    return(
        <Typography type="body2" style={{ color: '#FFFFFF' }}>{title}</Typography>
    )
}
export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()
  const handleClick = () => {
    setOpen(!open);
  };
  const handleNavigation = (e)=>{
      
      navigate(`/admin/${e.target.name}`)
  }

  return (
    <div className='flex bg-blue'>
      <List
    className='bg-blue'
      sx={{ width: '100%',height: "100%", maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      <ListItemButton onClick={()=>navigate("/admin/home")} name="home">
        <ListItemIcon>
          <DashboardIcon className='text-white'/>
        </ListItemIcon>
        <ListItemText   primary={<Texts name="home" title= "Dashboard"></Texts>} />
      </ListItemButton>
      
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon className='text-white' />
        </ListItemIcon>
        <ListItemText primary={<Texts title= "Users"></Texts>} />
        {open ? <ExpandLess className='text-white'/> : <ExpandMore className='text-white' />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton  onClick={()=>navigate("/admin/users")} name="influencers" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon className="text-white"/>
            </ListItemIcon>
            <ListItemText primary={<Texts title= "Influencers"></Texts>} />
        </ListItemButton>
        <ListItemButton  onClick={()=>navigate("/admin/bUsers")} name = "bUsers" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon className="text-white"/>
            </ListItemIcon>
            <ListItemText primary={<Texts title= "Business Users"></Texts>} />
        </ListItemButton>
        </List>
      </Collapse>

      {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon className='text-white' />
        </ListItemIcon>
        <ListItemText primary={<Texts title= "Activation Requests"></Texts>} />
        {open ? <ExpandLess className='text-white'/> : <ExpandMore className='text-white' />}
      </ListItemButton> */}
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/admin/activationRequests")} name = "acitivation">
            <ListItemIcon>
              <PersonIcon className="text-white"/>
            </ListItemIcon>
            <ListItemText primary={<Texts title= "Influencers"></Texts>} />
           </ListItemButton>
           
        </List>
      </Collapse> */}
    </List>
    </div>
  );
}