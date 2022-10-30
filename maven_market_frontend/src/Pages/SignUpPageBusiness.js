import React from 'react'
import Navbar from '../Components/Navbar'
import TextField from '@mui/material/TextField';
import Person3Icon from '@mui/icons-material/Person3';
import CampaignIcon from '@mui/icons-material/Campaign';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const SignUpPageBusiness = () => {
  return (
    <div>
        <Navbar></Navbar>
        <section className='container mx-auto'>
            <div className='flex-col justify-between px-4 pt-8 mb-6 space-x-6 sm:flex md:flex-row'>
                <div className='flex flex-col justify-center w-[50%] px-3 space-y-6 '>
                    <h1 className='text-left sm:text-lg md:text-xl font-railway'>Enter Your Details <span className='text-blue'>Sign Up</span> With The Best <br/><span className='text-green'>Influencer Marketing</span> Platform</h1>
                    <div className='flex flex-col space-y-4'>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                        <TextField id="outlined-basic" label="Business Email" variant="outlined"  />
                        <TextField id="outlined-basic" label="Business Name" variant="outlined" />
                        <TextField id="outlined-basic" label="What category does your business belong to " variant="outlined"  />
                        <TextField id="outlined-basic" label="Country" variant="outlined" />
                        <div className='flex justify-end pt-1 pr-3'>
                            <button className='px-3 pt-2 font-bold text-center text-white rounded-full drop-shadow-md md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Get Started</button>

                        </div>
                    </div>
               
                    
                </div>
                <div className='flex flex-col p-10 my-5 bg-slate-200 md:space-y-3'>
                    <h1 className='text-lg font-railway md:text-xl'>How <span className='text-blue'>Maven Marketing</span> Can Help In Growing Promoting Business?</h1>
                    <div className='flex items-center justify-start space-x-2'>
                        
                       <h1><Person3Icon></Person3Icon></h1> 
                       <h1 className='text-xl font-semibold'>Find and work with the <span className='text-green'>Right Influencer</span> for your brand</h1>
                        
                    </div>

                    <div className='flex justify-start space-x-2'>
                        
                        <h1><CampaignIcon></CampaignIcon></h1> 
                        <h1 className='text-xl font-semibold'>Create and <span className='text-blue'>Automate</span> your Campaign more <span className='text-green'>Efficiently</span></h1>
                         
                     </div>
                     <div className='flex justify-start space-x-2'>
                        
                        <h1><SummarizeIcon></SummarizeIcon></h1> 
                        <h1 className='text-xl font-semibold'>Get regulat <span className='text-blue'>Reports and Analytics</span> on your campaigns</h1>
                         
                     </div>

                     <div className='flex justify-start space-x-2'>
                        
                        <h1><MonetizationOnIcon></MonetizationOnIcon></h1> 
                        <h1 className='text-xl font-semibold'>Turn Influencer marketing into your top <span className='text-green'>Revenue Driving Source</span></h1>
                         
                     </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default SignUpPageBusiness