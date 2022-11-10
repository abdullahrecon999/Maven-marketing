import * as React from 'react';
import {Link} from '@mui/material';
import Typography from '@mui/material/Typography';

const getDate = ()=>{
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return today
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Box({title}) {
  return (
    <div className='flex flex-col justify-center py-7 px-9 rounded-lg shadow-lg hover: drop-shadow-lg hover:shadow-sm bg-white '>
      <h1 className='text-xl font-railway'>{title}</h1>
      <Typography component="p" variant="h6">
        1000
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {getDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View 
        </Link>
      </div>
    </div>
  );
}