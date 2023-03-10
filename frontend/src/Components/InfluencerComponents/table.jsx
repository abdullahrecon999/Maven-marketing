import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Campaign Title',
    width: 150,
    
  },
  {
    field: 'Brand Name',
    headerName: 'brandName',
    width: 150,
    
  },
  {
    field: 'submittedAt',
    headerName: 'Submitted At',
    type: 'number',
    width: 110,
    
  },
  {
    field: 'Status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
  }
];


export default function BidsTable({rows, onOpen}) {
  const handleRowClick = (params)=>{
    console.log("sghashfjsdhfjdahjdhajsheajsdhcjhasjchwiahdcivwbaidhcve")
    onOpen(params.row.id)

  }
  
  return (
    <Box sx={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={(params)=>{
          console.log(params.row.id)
          onOpen(params.row.id)
        }}
        getRowId ={(row) => row.id}
        experimentalFeatures={{ newEditingApi: true }}
        
      />
    </Box>
  );
}
