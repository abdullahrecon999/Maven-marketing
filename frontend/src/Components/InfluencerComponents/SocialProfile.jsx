import React from 'react'
import image from "../../images/profile.jpg"
const SocialProfile = () => {
  return (
    <div className='flex'>
        <div className='flex-[0.6] bg-gray-50 justify-center px-4 py-12'>
            <div className=' flex flex-col items-center justify-center space-y-2'>
                <img src={image} alt={image} className="w-[150px] h-[150px] rounded-full"/>
                <div className='flex flex-col space-y-0 items-center'>
                    <h1 className='text-black font-railway text-xl'>John Doe</h1>
                    <p className='text-gray-700 font-railway text-xs'>Lorem ispum.............................</p>
                </div>
                <hr className='border'></hr>

                <div className='flex flex-col'>
                    <h1 className='text-blue font-railway text-base'>About </h1>
                    <p className='text-gray-700 font-railway text-xs'>loeremdnf sfjasd jasfkasd ajsascnj ajsjasdjdna n jansfjn jasfjnasjdnc</p>
                </div>

                <hr ></hr>

                <div className='flex flex-col'>
                    <h1 className='text-blue font-railway text-base'>location </h1>
                    <p className='text-gray-700 font-railway text-xs'>loeremdnf sfjasd jasfkasd ajsascnj ajsjasdjdna n jansfjn jasfjnasjdnc</p>
                </div>
                <hr ></hr>

                <div className='flex flex-col'>
                    <h1 className='text-blue font-railway text-base'>languages </h1>
                    <p className='text-gray-700 font-railway text-xs'>loeremdnf sfjasd jasfkasd ajsascnj ajsjasdjdna n jansfjn jasfjnasjdnc</p>
                </div>

            </div>
            
        </div>

        <div className='flex-1 bg-slate-200'>
            other details
        </div>

        <div className='flex-[0.75] bg-slate-300'>
            add platforms
        </div>
    </div>
  )
}

export default SocialProfile