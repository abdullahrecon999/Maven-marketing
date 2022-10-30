import React from 'react'

const LoginModal = ({visible, onClose}) => {

    const handleClose = (e)=>{
        if(e.target.id === 'container') onClose();
        
    }
    if(!visible)
        return null;
  return (
    <div  id='container' onClick={handleClose} className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30'>
        <div className='flex flex-col px-10 pb-10 space-y-4 bg-white border rounded pt-7 sm:mx-4 '>
            <h1 className='text-center font-railway text-blue sm:text-sm'> login as</h1>
            <div className='flex flex-row justify-between space-x-5 sm:'>
                <div className='flex flex-col items-center justify-center p-10 bg-white border rounded-lg drop-shadow-lg sm:px-8 hover:drop-shadow-2xl '>
                        <h1 className='text-sm font-railway'>Brand</h1>
                        
                </div>
                <div className='flex flex-col items-center justify-center p-10 bg-white border rounded-lg drop-shadow-lg sm:px-4 hover:drop-shadow-2xl'>
                        <h1 className='text-sm font-railway'>Influencer</h1>
                       
                </div>


            </div>

            
        </div>
    </div>
  )
}

export default LoginModal 