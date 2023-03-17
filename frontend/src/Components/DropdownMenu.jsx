import React from 'react'

const DropdownMenu = () => {
  return (
    
    <div className='absolute flex flex-col items-center w-auto py-8 mt-10 space-x-6 font-bold bg-white md:hidden justify-self-center sm: left-3 right-3 drop-shadow-md '>
            <a href='#' className='text-grey hover:text-blue'>Services</a>
            <a href='#' className='text-grey hover:text-blue'>about us</a>
            <a href='#' className='text-grey hover:text-blue'>why us?</a>

            <div className='flex flex-row space-x-2 '> 
                <a href='#' className='text-grey hover:text-blue'>login</a>
                <a href='#' className='text-grey hover:text-blue'>sign up</a>
            </div>
    </div>
  )
}

export default DropdownMenu