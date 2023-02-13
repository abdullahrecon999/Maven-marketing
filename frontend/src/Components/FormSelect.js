import React,  {useState, useEffect} from 'react'
import {TextField, MenuItem} from "@mui/material"
import { useField, ErrorMessage } from 'formik'
import Select from '@mui/material/Select';
const FormSelect = ({data,setvalue,...props}) => {
  const [feild, meta] = useField(props)
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(()=>{
    setvalue(feild.name, selectedValue)


  }, [selectedValue])
  const handleChange = (e)=>{
    
    const {
      target: { value },
    } = e;
    setSelectedValue(typeof value === 'string' ? value.split(',') : value)
    
    
    
    
    

  }
  return (
    <div className='flex flex-col'>
    <Select required 
    sx={{width : {md:300}}} 
    id="select" 
    {...props} 
    {...feild}
    onChange={e => handleChange(e)}
    value={selectedValue}
    multiple
     >
      
      
      {data.map(ele => {return(<MenuItem value={ele}>{ele}</MenuItem>)})}
    </Select>
    <ErrorMessage component="div" className='text-sm text-red-600' name={feild.name}></ErrorMessage>
    </div>

  )
}

export default FormSelect