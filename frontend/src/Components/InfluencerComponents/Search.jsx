import React from 'react'
import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
const Search = ({handleSetSearch,handleSearchSubmit}) => {
    const handleChange = (e)=>{
        handleSetSearch(e)
    }

    const handleSubmit=()=>{
        handleSearchSubmit()
    }

  return (
    <div className='flex space-x-2 items-center'>
        <TextField
        onChange={(e)=>{
            handleChange(e)
        }}
         size='small' inputProps={{
            style:{
                height: "20px",
                borderRadius: 100
            }
        }}
        
        placeholder="Search"></TextField>
        <button>
        <SearchIcon  className='text-blue text-xl rounded-full hover:bg-slate-100'/>

        </button>
    </div>
  )
}

export default Search