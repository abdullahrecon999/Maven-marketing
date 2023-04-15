import React from 'react'
import { TextField } from '@mui/material'
import { useField, ErrorMessage } from 'formik'
const style = {
    width:{md:600},
    "& .MuiInputBase-root":{
        height: {sm: 35 ,md:40}
    }

}

const FormTextField = ({...props}) => {
    const [feild, meta] = useField(props)
    
  return (
        <>
         <TextField sx={style} 
        required
        {...props}
        {...feild}
        size='small'
        >
          
        </TextField>
        <ErrorMessage component="div" className='text-sm text-red-600' name={feild.name}></ErrorMessage>
        </>
    
  )
}

export default FormTextField