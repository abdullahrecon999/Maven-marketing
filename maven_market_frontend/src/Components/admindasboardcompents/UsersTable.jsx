import React from 'react'

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataGrid, useGridApiEventHandler, useGridApiContext, } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import {useState} from "react"
const columns1 = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'platform',
      headerName: 'platform',
      width: 150,
      editable: true,
    },
    {
      field: 'Status',
      headerName: 'Status',
      type: 'number',
      width: 110,
      editable: true,
    }
    
  ];
  
  const columns2 = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Brand Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
    },
    {
      field: 'Status',
      headerName: 'Status',
      type: 'number',
      width: 110,
      editable: true,
    }
    
  ];
  const rows = [
    { id: 1, Name: 'Snow', platform: 'Jon', Status: "pending"},
    { id: 2, Name: 'Lannister', platform: 'Cersei', Status: "pending" },
    { id: 3, Name: 'Lannister', platform: 'Jaime', Status: "pending" },
    { id: 4, Name: 'Stark', platform: 'Arya', Status: "pending" },
    { id: 5, Name: 'Targaryen', platform: 'Daenerys', Status: "pending" },
    { id: 6, Name: 'Melisandre', platform: null, Status: "pending" },
    { id: 7, Name: 'Clifford', platform: 'Ferrara', Status: "pending"},
    { id: 8, Name: 'Frances', platform: 'Rossini', Status: "pending" },
    { id: 9, Name: 'Roxie', platform: 'Harvey', Status: "pending"},
  ];
  
const UsersTable = ({type}) => {
    const navigate = useNavigate()
    
    console.log(type)
  
    const handleClick = (params)=> {
      
      navigate(`influencer/${params.row.id}`,{id: params.row.id})
      
    }
  return (
    <div className='flex flex-col bg-white py-7 px-8 mb-12 mx-6'>
      
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        onRowClick={handleClick}
        rows={rows}
        columns={type ==="influencer"? columns1:columns2}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
     
    </div>
  )
}

export default UsersTable