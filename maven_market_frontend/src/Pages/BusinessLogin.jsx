import React from 'react'
import Navbar from '../Components/Navbar'
import TextField from '@mui/material/TextField';
import {styled} from "@mui/system"
import GoogleSignup from '../Components/GoogleSignup';

import { useNavigate } from 'react-router-dom';


const InfluencerLogin = () => {
    const navigate = useNavigate();
    const navigateToVerificationPage = ()=> {
        navigate("/verify");
    }
  return (
    <div>
        <Navbar></Navbar>
        <section className='container mx-auto'>
            <div className='px-4 pt-2  mb-6 space-x-8 sm:flex flex-col-reverse md:flex-row md:pt-1'>
                <div className='flex flex-col justify-center  px-10 space-y-6 md:w-[50%] '>
                    <div>
                        <h1 className='text-left sm:text-lg md:text-xl font-railway'>Login</h1>
                        <p className= "text-sm text-grey">Its good to see you back</p>
                    </div>
                    <div className='flex flex-col space-y-3 '>
                      
                        <TextField autoComplete size='small' id="outlined-basic" label="Enter Email" variant="outlined"  />
                        <TextField size='small' id="outlined-basic" label="Password" variant="outlined" />
                        
                        
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <div className='flex justify-center pt-1 pr-3'>
                                <button onClick={()=> navigateToVerificationPage()} className='px-8 py-2  font-bold text-center text-white rounded-full drop-shadow-md sm:text-center justify-center items-center md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Login</button>
                                
                            </div >
                            <p className='font-railway text-sm text-grey'>or</p>
                            <GoogleSignup></GoogleSignup>
                        </div>
                       
                    </div>
                   
               
                    
                </div>
                <div className='flex flex-col  my-5  items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14  md:items-start '>
                    <h1 className='text-3xl text-blue font-semibold font-railway md:text-4xl'>Maven Marketing</h1>
                    <p className='font-semibold sm: text-base md:text-xl'>An Expert Marketing Choice</p>
                    
                </div>
            </div>
        </section>
    </div>
  )
}

export default InfluencerLogin