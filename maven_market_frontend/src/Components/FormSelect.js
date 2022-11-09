import React from 'react'
import {TextField, MenuItem} from "@mui/material"
import { useField, ErrorMessage } from 'formik'

const FormSelect = ({data,...props}) => {
  const [feild, meta] = useField(props)
  
  return (
    <div className='flex flex-col'>
    <TextField required sx={{width : {md:300}}} id="select" {...props} {...feild} select >
      
      
      {data.map(ele => {return(<MenuItem value={ele}>{ele}</MenuItem>)})}
    </TextField>
    <ErrorMessage component="div" className='text-sm text-red-600' name={feild.name}></ErrorMessage>
    </div>

  )
}

export default FormSelect