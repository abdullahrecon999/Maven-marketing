import React from 'react'
import {TextField, MenuItem} from "@mui/material"

const FormSelect = ({data, props}) => {
  return (
    <TextField required sx={{width : {md:300}}} id="select" {...props}value="0" select>
    <MenuItem value = "0">Select {props.label}</MenuItem>
    <MenuItem value="10">Ten</MenuItem>
    <MenuItem value="20">Twenty</MenuItem>
    </TextField>

  )
}

export default FormSelect