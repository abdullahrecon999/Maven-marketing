import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



export default function BidsTable({rows, onOpen, columns}) {
  
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
