import React from 'react'
import profileImage from "../../images/profile.jpg"
const ContractInfo = () => {
  return (
    <div className='border px-4 py-5'>
        
        <div className='flex flex-col w-full space-y-2'>
            <h1 className='text-gray-500'> Contract Details</h1>
            <div className='flex flex-col  border-y py-3'>
              <h1 className='font-railway text-gray-500'>Active</h1>
              <h1 className='text-sm'>Active since date</h1>
              <h1 className='text-sm'>Expires At</h1>
              <a href='#' className='text-sm text-blue hover:text-indigo-500'>View Original Campaign</a>
            </div>
            <label className='self-end border text-base px-1 border-blue text-blue'>End Contract</label>
        </div>
    </div>
  )
}

export default ContractInfo