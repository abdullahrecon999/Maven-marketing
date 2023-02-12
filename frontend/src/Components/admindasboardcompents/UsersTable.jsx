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
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
    },
    {
      field: 'email_verified',
      headerName: 'Verified',
      type: 'boolean',
      width: 110,
      editable: false,
    },
    {
      field: 'platforms',
      headerName: 'Platform',
      width: 150,
      editable: false,
    }
  ];
  
  const columns2 = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
    },
    {
      field: 'email_verified',
      headerName: 'Verified',
      type: 'boolean',
      width: 110,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false,
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
    { id: 9, Name: 'Roxie', platform: ['Harvey','new'], Status: "pending"},
  ];
  
const UsersTable = ({type, data}) => {
    const navigate = useNavigate()
    
    console.log(type)
    console.log("From Tables: ",data)
  
    const handleClick = (params)=> {
      //navigate(`influencer/${params.row.id}`,{id: params.row.id})
    }

  return (
    <div className='flex flex-col bg-white py-7 px-8 mb-12 mx-6'>
      
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        onRowClick={handleClick}
        rows={data}
        getRowId ={(row) => row._id}
        columns={type === "influencer"? columns1 : columns2}
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