import React from 'react'
import { DataGrid, useGridApiEventHandler, useGridApiContext, } from '@mui/x-data-grid';
import { Box } from '@mui/system';

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

  const rows = [
    { id: 1, Name: 'Snow',  Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Jon'},
    { id: 2, Name: 'Lannister', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Cersei' },
    { id: 3, Name: 'Lannister', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Jaime' },
    { id: 4, Name: 'Stark', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Arya' },
    { id: 5, Name: 'Targaryen', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Daenerys' },
    { id: 6, Name: 'Melisandre', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: null },
    { id: 7, Name: 'Clifford', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Ferrara'},
    { id: 8, Name: 'Frances', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Rossini' },
    { id: 9, Name: 'Roxie', Description: "loremdnfasdfaskdskhdcvkjaskjcbvskjd", category: "beauty products", location: "pakistan", platform: 'Harvey'},
  ];

const InfluencerTable = ({data}) => {
  return (
    <div className=' px-6 pt-4'>
    <div className='flex flex-col space-y-1 px-4 py-1 border'>
      <div className='flex flex-col justify-between space-x-1 px-4 py-2 border rounded-sm bg-gray-100'>
        <h1 className='text-sm font-railway md:text-base'>Influencers</h1>
        <Box sx={{ height: 400, width: '100%' ,background: "white"}}>
      <DataGrid
        getRowId ={(row) => row._id}
        rows={data}
        columns= {columns1}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        
      </div>
     
      </div>
      </div>
  )
}

export default InfluencerTable