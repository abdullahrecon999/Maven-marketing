import React from 'react'
import Navbar from '../Components/Navbar'
import Button from '@mui/material/Button';
const AccountVerification = () => {
    const verify = () =>{

    }
    const resendEmailOtp = ()=> {

    }
    const resendPhoneOtp = ()=> {
        
    }
  return (
    <>
    <Navbar></Navbar>
    <section className='container mx-auto'>
        <div className='flex p-10  justify-center'>
            <div className='flex flex-col bg-white space-y-4 justify-start p-4 drop-shadow-sm border'>
                <div>
                <h1 className='font-railway md:text-2xl'>Profile verification</h1>
                <p className='text-xxs text-grey md:text-xs'>An OTP has been sent to your email and contact number <br/>enter the OTP to verify your profile</p>
                </div>
                <div >
                <p className='text-sm'>Enter email OTP   <input id="email" className='border-2'></input></p>
                <button className='text-xs text-blue hover:text-grey'>Resend Email otp</button>
                </div>

                <div >
                <p className='text-sm'>Enter email OTP   <input id="email" className='border-2'></input></p>
                <button className='text-xs text-blue hover:text-grey'>Resend Email otp</button>
                </div>
                <div className='self-end'>
                <Button variant='contained'> verify</Button>
                </div>
                
            </div>
           
           
        </div>

    </section>
    </>
  )
}

export default AccountVerification