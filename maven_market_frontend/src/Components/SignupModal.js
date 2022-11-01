import React from 'react'
import { Link } from 'react-router-dom';
const SignupModal = ({visible, onClose}) => {

    const handleClose = (e)=>{
        if(e.target.id === 'container') onClose();
        
    }
    if(!visible)
        return null;
  return (
    <div  id='container' onClick={handleClose} className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30'>
        <div className='flex flex-col px-10 pb-10 space-y-4 bg-white border rounded pt-7 sm:mx-4 '>
            <h1 className='text-center font-railway text-blue sm:text-sm'> Sign Up as</h1>
            <div className='flex flex-row justify-between space-x-5 sm:'>
                <Link to="/BusinessSignup">
                    <div className='flex flex-col items-center justify-center p-10 bg-white border rounded-lg drop-shadow-lg sm:px-4 hover:drop-shadow-2xl '>
                            <h1 className='text-sm font-railway'>Brand</h1>
                            <p className='text-center break-normal text-grey sm: text-xxs '>start your journey <br/>with us as brand <br/>to grow and promote <br/>your business</p>
                    </div>
                </Link>
                <Link to= "/InfluencerSignup">
                    <div className='flex flex-col items-center justify-center p-10 bg-white border rounded-lg drop-shadow-lg sm:px-4 hover:drop-shadow-2xl'>
                        <h1 className='text-sm font-railway'>Influencer</h1>
                        <p className='text-center break-normal text-xxs text-grey'>start your journey <br/>with us as brand <br/>to grow and promote <br/>your business</p>
                    </div>
                </Link>
                


            </div>

            
        </div>
    </div>
  )
}

export default SignupModal 