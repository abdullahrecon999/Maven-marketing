import * as React from 'react';
import {useEffect, useState, useMemo} from "react"
import { NavLink, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'platform',
    headerName: 'Platform',
    width: 150,
    editable: true,
  },
  {
    field: 'profileActive',
    headerName: 'Profile Status',
    type: 'number',
    width: 110,
    
  }
  
];

export default function Users({data}) {

  const navigate = useNavigate()

  const convertData = (data)=>{
    return data?.map(data=> {
      return {
        id : data?._id,
        name: data?.name,
        platform: data?.platforms.toString(),
        profileActive: data?.profileActive,
        //country: data?.country.toString()
    }})
  }

  const userData = useMemo(()=>{
    return convertData(data)
  }, [data])

  console.log(userData)
 
  
  const handleClick = (params)=> {
    
    navigate(`influencer/${params.row.id}`,{id: params.row.id})
    
  }
  return (
   
    <div className='flex flex-col bg-white py-7 px-8 mb-12 mx-6'>
      <h1 className='font-railway text-blue text-base mb-2'>Profile Activation Requests</h1>
      <Box sx={{ height: 400, width: '100%' }}>
      
      <DataGrid
        onRowClick={handleClick}
        rows={convertData(data)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
     
    </div>
  );
}