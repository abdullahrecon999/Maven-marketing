import React from 'react'
import TextField from '@mui/material/TextField';
import GoogleSignup from './GoogleSignup';
import GettingStartedButton from "./GettingStartedButton"

const LoginModalBrand = ({visible, onClose}) => {

    const handleClose = (e)=>{
        if(e.target.id === 'container') onClose();
        
    }
    if(!visible)
        return null;
  return (
    
    <div  id='container' onClick={handleClose} className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30'>
       <div className='flex flex-col bg-white px-10 py-8 border rounded-lg space-y-4 drop-shadow-lg'>
            <div>
            <h1 className='text-base font-bold font-railway'>Welcome!</h1>
            <p className='text-xs text-grey'>Enter Details to login your Influencer account</p>
            </div>
            <div className='flex flex-col space-y-2'>
                <TextField required size='small' id="outlined-basic" label="Enter Email" variant="outlined" />
                <TextField size='small' id="outlined-basic" label="Enter password" variant="outlined" />
                <div className='flex justify-center pt-1 '>
                    <button className='px-5 py-2  font-bold text-center text-white rounded-full drop-shadow-md text-xs justify-center items-center md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Login</button>
                                
                </div >
            </div>
            <p className='text-center text-xs text-grey'>or</p>
            <GoogleSignup></GoogleSignup>
            
       </div>
    </div>
  )
}

export default LoginModalBrand 