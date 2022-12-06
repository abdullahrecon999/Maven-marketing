import React from 'react'

import { TextField } from '@mui/material'
import { useField, ErrorMessage } from 'formik'
const FormFeild3 = ({...props}) => {

    const [feild, meta] = useField(props)
    
  return (
        <>
         <TextField
        required
        {...props}
        {...feild}
        size='small'
        fullWidth
        >
          
        </TextField>
        <ErrorMessage component="div" className='text-sm text-red-600' name={feild.name}></ErrorMessage>
        </>
    
  )
}


export default FormFeild3