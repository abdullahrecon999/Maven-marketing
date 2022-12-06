import * as React from 'react';
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




// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



const columns = [
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

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Users() {

  const navigate = useNavigate()

  
  const handleClick = (params)=> {
    
    navigate(`influencer/${params.row.id}`,{id: params.row.id})
    
  }
  return (
    <div className='flex flex-col bg-white py-7 px-8 mb-12 mx-6'>
      <h1 className='font-railway text-blue text-base mb-2'>Profile Activation Requests</h1>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        onRowClick={handleClick}
        rows={rows}
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