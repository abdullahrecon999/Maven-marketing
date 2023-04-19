import React from 'react'
import profileImage from "../../images/profile.jpg"
const User = () => {
  return (
    <div className='border px-4 py-5'>
        
        <div className='flex flex-col w-full space-y-2'>
            <h1 className='text-gray-500'> type</h1>
            <div className='flex space-x-4 border-y py-3'>
              <img className='w-[50px] h-[50px] rounded-full' src={profileImage} alt="tomatoes are disgusting"></img>
              <div>
                  <h1 className='font-railway'> name</h1>
                  <p className='text-gray-600'>Cateogry</p>
              </div>
            </div>
            <label className='self-end border text-base px-1 border-blue text-blue'>Message</label>
        </div>
    </div>
  )
}

export default User