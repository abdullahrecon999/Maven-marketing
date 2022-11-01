import React from 'react'
import Navbar from '../Components/Navbar'
import TextField from '@mui/material/TextField';
import {styled} from "@mui/system"
import GoogleSignup from '../Components/GoogleSignup';



const SignUpPageBusiness = () => {
  return (
    <div>
        <Navbar></Navbar>
        <section className='container mx-auto'>
            <div className='px-4 pt-8 mb-6 space-x-8 sm:flex flex-col-reverse md:flex-row'>
                <div className='flex flex-col justify-center  px-10 space-y-6 md:w-[50%] '>
                    <div>
                        <h1 className='text-left sm:text-lg md:text-xl font-railway'>Sign Up</h1>
                        <p className= "text-sm text-grey">Its quick and easy</p>
                    </div>
                    <div className='flex flex-col space-y-5 '>
                      
                        <TextField size='small' id="outlined-basic" label="Enter Email" variant="outlined" />
                        <TextField size='small' id="outlined-basic" label="Password" variant="outlined"  />
                        <TextField size='small' id="outlined-basic" label="Confirm Password" variant="outlined" />
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <div className='flex justify-center pt-1 pr-3'>
                                <button className='px-3 py-2  font-bold text-center text-white rounded-full drop-shadow-md sm:text-center justify-center items-center md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Get Started</button>
                                
                            </div >
                            <p className='font-railway text-sm text-grey'>or</p>
                            <GoogleSignup></GoogleSignup>
                        </div>
                       
                    </div>
                   
               
                    
                </div>
                <div className='flex flex-col  my-5  items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14  md:items-start '>
                    <h1 className='text-3xl text-blue font-semibold font-railway md:text-4xl'>Maven Marketing</h1>
                    
                    <p className='font-semibold text-xl'>A Platform To Earn Money By Collaborating With Brands And Businesses</p>

                    {/* <div className='flex items-center justify-start space-x-2'>
                        
                       <h1><Person3Icon></Person3Icon></h1> 
                       <h1 className='text-xl font-semibold'>Find and work with the <span className='text-green'>Right Influencer</span> for your brand</h1>
                        
                    </div> */}

                    {/* <div className='flex justify-start space-x-2'>
                        
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
                         
                     </div> */}
                </div>
            </div>
        </section>
    </div>
  )
}

export default SignUpPageBusiness