import React from 'react'
import {Box} from '@mui/material'
const ProfileConnect = () => {
  return (
    <Box
            sx= {{
              display: "flex",
              width: "80%",
              padding: 1,
              backgroundColor: "orange",
              justifyContent: "center",
              paddingLeft: 2,
              paddingRight: 2,
              marginLeft: 6

            }}
          >
            <div className='flex space-x-2'>
            <h1> logo</h1>
            <h1 className='text-black font-railway text-base'>connect with platform</h1>
            </div>
    </Box>
  )
}

export default ProfileConnect