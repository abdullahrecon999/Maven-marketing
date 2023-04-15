import React, {Children} from 'react'

const InfluencerGenaricModal = ({children, text}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30 z-[100]   '>
        <div className='border bg-white overflow-y-auto  w-[50%] h-[70vh]'>
          
            {children}
         
        </div>
    </div>
  )
}

export default InfluencerGenaricModal