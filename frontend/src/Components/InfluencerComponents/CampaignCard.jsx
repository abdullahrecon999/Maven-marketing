import React from 'react'
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useNavigate } from 'react-router-dom';

const CardDate = ()=> {
    return (
      <div className='flex border rounded-xl space-x-2 px-2 py-1 '>
        
        <h2 className='text-xs font-railway text-grey'><CalendarMonthIcon></CalendarMonthIcon>11/11/11</h2>
      </div>
    )
  }
const CampaignCard = ({avatar,brandName, title, description, banner, id})=>{

  const navigate = useNavigate();
  const openCampaign = ()=>{
    navigate("/campaigndetails",
    {state:{
      id: id
    }})


  }

  return (
    <div onClick={()=>{
      openCampaign()
    }} className="card h-[430px] border flex bg-base-100 hover:shadow-xl rounded-xl max-w-[290px] min-w-[270px]">
			<div className="p-3">

				<div className="flex">
					<div className="avatar online placeholder">
						<div className="bg-neutral-focus text-neutral-content rounded-full w-11 h-11">
							{/* <img src="https://www.rfa.org/english/news/china/warning-01082021091841.html/@@images/2ad7ab11-b78f-44d3-b587-618128d3dfc7.jpeg" /> */}
							<img src={avatar} />
						</div>
					</div>
					<div className="flex-col ml-2">
						
            <h3 className='font-bold'>{title}</h3>
						<div className="flex gap-1 items-center">

							

						</div>
					</div>
					<div className="flex w-1/3 justify-end">
						<div className="flex">
							<p className="text-xs text-yellow-300">3.5</p>
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								width="20" height="20"
								viewBox="0 0 48 48">
								<linearGradient id="q0c2dLEp_4LHk~8cW2fATa_8ggStxqyboK5_gr1" x1="9.009" x2="38.092" y1="6.36" y2="45.266" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffda1c"></stop><stop offset="1" stop-color="#feb705"></stop></linearGradient><path fill="url(#q0c2dLEp_4LHk~8cW2fATa_8ggStxqyboK5_gr1)" d="M24.913,5.186l5.478,12.288l13.378,1.413c0.861,0.091,1.207,1.158,0.564,1.737l-9.993,9.005	l2.791,13.161c0.18,0.847-0.728,1.506-1.478,1.074L24,37.141l-11.653,6.722c-0.75,0.432-1.657-0.227-1.478-1.074l2.791-13.161	l-9.993-9.005c-0.643-0.579-0.296-1.646,0.564-1.737l13.378-1.413l5.478-12.288C23.439,4.395,24.561,4.395,24.913,5.186z"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div className="flex-col align-top">
      <div className="flex justify-center">
							<img className="object-cover h-[280px] w-[270px]" src={banner}  alt="abc"/>
						</div>
			</div>
			<div className="flex bg-slate-100 w-full p-1 justify-between">
				<p className="text-xs text-cyan-500 font-bold w-full">Due</p>
				<p className="text-xs font-bold">cash</p>
			</div>
			<div className="w-full p-1">
				<p className="text-sm line-clamp-2">{description}</p>
			</div>
		</div>
  )
    // return(<div onClick={()=>{
    //   console.log(id)
    //   openCampaign()
    // }} className="flex flex-col border rounded-xl w-[100%] mt-2 h-[300px] mx-3 mb-2 md:w-[230px] shadow-xl hover:-translate-y-1 hover:shadow-2xl">
 
    //           <div className='flex p-3   space-x-4'>
    //             <CampaignIcon className=' text-4xl text-green'/>
    //             <div className='flex flex-col '>
    //               <h1 className="font-railway text-base text-black">{name}</h1>
    //               <h1 className= "font-railwat text-sm text-grey">{brand.slice(0,10)+"...."}</h1>
    //             </div>
    //           </div>
    //           <img src={banner} alt="asjkshd" className="object-cover h-[54%] w-[100%] opacity-50 hover:opacity-100  "></img>
    //           {/* <div className='flex flex-col mt-1 '>
    //             <h4 className='text-xxs font-railway text-grey'>Category</h4>
    //             <h1 className='font-Andika text-white px-2 py-1 mr-1 mb-2 rounded-full text-xs w-[80px] bg-green text-center'>twitter</h1>
    //           </div> */}
              
    //           <div className='flex-start flex justify-between mx-3 pt-3 '>
                  
    //               <CardDate></CardDate>
    //           <h1 className= "text-lg text-green">{compensation}</h1>
    //           </div>
              
    //  </div>)
}
export default CampaignCard