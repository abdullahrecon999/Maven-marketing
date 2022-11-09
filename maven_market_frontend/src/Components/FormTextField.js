import React from 'react'
import { TextField } from '@mui/material'
const style = {
    width:{md:600},
    "& .MuiInputBase-root":{
        height: {sm: 35 ,md:40}
    }

}

const FormTextField = ({...props}) => {
    console.log(props)
  return (
   
    <TextField sx={style} 
                    required
                    {...props}
                    size='small'
                    ></TextField>
    
  )
}

export default FormTextField