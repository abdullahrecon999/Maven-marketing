import React from 'react'
import { Button, Box} from '@mui/material'
import image from "../../images/profile.jpg"
const Influencer = () => {
  return (
    <div className='flex flex-col px-4 py-5  border border-slate-300 rounded-lg mt-3'>
        <div className='flex justify-between'>
            
            <div>
            <h1 className='font-railway text-xs'>Name</h1>
            
            <p className='font-railway text-xs'>PlatForm</p>
            </div>
            <div>
                <img src={image} className="h-12 w-12 rounded-full"></img>
            </div>
        </div>
        <Box>
            <Button className='bg-green font-railway text-xs' variant='contained'> View Profile</Button>
        </Box>
    </div>
  )
}

export default Influencer