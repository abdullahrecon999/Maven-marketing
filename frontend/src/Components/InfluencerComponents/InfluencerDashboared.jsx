import React from 'react'
import {Box} from '@mui/material'
import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import image from "../../images/mobile.jpg" 
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
function DashboardCard ({title, subtitle, buttonText}){
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' , margin: 1}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h8">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {subtitle}
          </Typography>
          <Button>{buttonText}</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 121 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

function PayoutCard ({title, subtitle, buttonText, amount}){
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' , margin: 1}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h8">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {subtitle}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            available  {amount}
          </Typography>
          <Button>{buttonText}</Button>
        </CardContent>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 121 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

const CardDate = ()=> {
  return (
    <div className='flex border rounded-xl space-x-2 px-2 py-1 '>
      
      <h2 className='text-xs font-railway text-grey'><CalendarMonthIcon></CalendarMonthIcon>11/11/11</h2>
    </div>
  )
}

const CampaignCard = ()=>{
    return(<div className="flex flex-col border rounded-xl w-[100%] mt-2 h-[95%] md:w-[230px] shadow-xl hover:translate-y-1 hover:shadow-2xl">
 
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

const CampaignCarasoul = ()=>{
  return (<div className=' overflow-x-auto flex flex-1 space-x-4 bg-orange-500 w-[100%] '>
      

  </div>)
}

const InfluencerDashboaredCampaign = ({onViewClick})=>{
  return(
    
     <div className= "flex flex-col  border mx-4 my-2 rounded-xl">
      <div className='flex justify-between p-4'>
        <h1 className='text-black font-railway'>Campaigns You Might Be Interested In</h1>
        <Button variant="outlined" onClick={()=> onViewClick(1)}> View All</Button>
        
      </div>
      <hr></hr>
      <div className="flex flex-col  px-5 space-x-3 md:flex-row">
        <CampaignCard></CampaignCard>
        <CampaignCard></CampaignCard>
        <CampaignCard></CampaignCard>
        
      </div>

     </div>       
           
  )
}

const InfluencerDashboared = ({onCampaignViewClick}) => {
  return (
    <Box sx={{display: "flex"}}>
        <Box sx={{display: "flex", flex: 1,
          flexDirection: "column",
          
          }}>
            <Box
            sx={{
              display: "flex",
              flexDirection: {
                sm: "column",
                md: "row",
                xs: "column"
              },
              paddingTop: 2
            }}
            >
              <Box 
                sx={{
                  display: "flex",
                  flexDirection: {
                    md: "row",
                    sm: "row",
                    xs: "column"
                  }
                }}
              >
                <DashboardCard title="Bid on Campaigns" subtitle="Put yourself out there to collaborate with brands" buttonText="submit Bids"></DashboardCard>
                <DashboardCard title="View All campaigns" subtitle="view campaings in order to collaborate with brands"  buttonText="View Campaigns"></DashboardCard>
              </Box>
              <Box>
                <PayoutCard title="Payouts" subtitle= "your pending and available paoyouts are here" buttonText="View"  amount={10}></PayoutCard> 
              </Box>
            </Box>

            <InfluencerDashboaredCampaign onViewClick={onCampaignViewClick}></InfluencerDashboaredCampaign>

        </Box>
        <Box 
          sx={{
            
            flex: 0.5,
            border:0.5,
            display: {
              xs: "none",
              sm: "none",
              md: "flex"
            },
            flexDirection: 'column',
            borderColor: "divider",
            boxShadow: 0.5,
            padding : 2,
            backgroundColor: "#fafafa",
            

          }}
        >
          <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent : "space-between",
            marginBottom: 4
            
          }}>
            <h1 className="text-lg font-railway">Add Platform</h1>
            <h1 className='text-blue font-bold font railway text-base'> Why?</h1>
          </Box>

          <Box
          
            sx= {{
              display: "flex",
              width: "80%",
              padding: 1,
              
              justifyContent: "center",
              paddingLeft: 2,
              paddingRight: 2,
              marginLeft: 6,
              marginBottom: 1,
              border:1,
              borderRadius: 2,
              borderColor: "divider"

            }}
          >
            <div className='flex space-x-2'>
            <h1> logo</h1>
            <h1 className='text-black font-railway text-base'>connect with platform</h1>
            </div>
          </Box>

          <Box
            sx= {{
              display: "flex",
              width: "80%",
              padding: 1,
              
              justifyContent: "center",
              paddingLeft: 2,
              paddingRight: 2,
              marginLeft: 6,
              marginBottom: 1,
              border:1,
              borderRadius: 2,
              borderColor: "divider"

            }}
          >
            <div className='flex space-x-2'>
            <h1> logo</h1>
            <h1 className='text-black font-railway text-base'>connect with platform</h1>
            </div>
          </Box>
          

          
          

        </Box>
    </Box>
  )
}

export default InfluencerDashboared