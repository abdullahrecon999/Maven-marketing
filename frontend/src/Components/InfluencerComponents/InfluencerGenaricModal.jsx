import React, {Children} from 'react'

const InfluencerGenaricModal = ({children, text}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30 z-[100]   '>
        <div className='border px-10 py-9 bg-white rounded-2xl w-[60%] h-[80vh]'>
          <div className=' w-min-[100%]'>
          <div className=' flex flex-col space-y-4 border bg-white px-6 py-5 w-[100%]'>
            {children}
          </div>
          </div>
        </div>
    </div>
  )
}

export default InfluencerGenaricModal