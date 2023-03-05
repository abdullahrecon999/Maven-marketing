import React from 'react'
import {Box} from '@mui/material'
const AddConnection = () => {
  return (
    <div className=' flex flex-1' ><Box 
    sx={{
      
      flex: 1,
      
      display: {
        xs: "none",
        sm: "none",
        md: "flex"
      },
      flexDirection: 'column',
      
      boxShadow: 0.5,
      padding : 2,
     
      height: "100%"
      

    }}
  >
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent : "space-between",
      marginBottom: 4
      
    }}>
      <h1 className="text-lg font-railway">Add Platform</h1>
      <h1 className='text-blue font-bold font railway text-base'> Why?</h1>
    </Box>

    <Box
    
      sx= {{
        display: "flex",
        width: "80%",
        padding: 1,
        
        justifyContent: "center",
        paddingLeft: 2,
        paddingRight: 2,
        marginLeft: 6,
        marginBottom: 1,
        border:1,
        borderRadius: 2,
        borderColor: "divider"

      }}
    >
      <div className='flex space-x-2'>
      <h1> logo</h1>
      <h1 className='text-black font-railway text-base'>connect with platform</h1>
      </div>
    </Box>

    <Box
      sx= {{
        display: "flex",
        width: "80%",
        padding: 1,
        
        justifyContent: "center",
        paddingLeft: 2,
        paddingRight: 2,
        marginLeft: 6,
        marginBottom: 1,
        border:1,
        borderRadius: 2,
        borderColor: "divider"

      }}
    >
      <div className='flex space-x-2'>
      <h1> logo</h1>
      <h1 className='text-black font-railway text-base'>connect with platform</h1>
      </div>
    </Box>
    

    
    

  </Box></div>
  )
}

export default AddConnection