import React, {useState} from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import NestedList from '../../Components/AdminDashboardList'
import  Button from "@mui/material/Button"
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
import TextField  from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Height } from '@mui/icons-material';
import UsersTable from '../../Components/admindasboardcompents/UsersTable';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
  
  
  
  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'Elvis Presley',
      'Tupelo, MS',
      'VISA ⠀•••• 3719',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2019',
      'Paul McCartney',
      'London, UK',
      'VISA ⠀•••• 2574',
      866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
      3,
      '16 Mar, 2019',
      'Michael Jackson',
      'Gary, IN',
      'AMEX ⠀•••• 2000',
      654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'VISA ⠀•••• 5919',
      212.79,
    ),
  ];
  
  function preventDefault(event) {
    event.preventDefault();
  }

const Users = () => {
  const[text, setText] = useState("")
  const handleClick =()=>{
    // use to fetch the results
    console.log(text)

  }

  const coloumns = [
    {feild: "id", headerName:"Id",width: 90},
    {feild: "name", headerName:"Name",width: 90},
    {feild: "platform", headerName:"Platform",width: 90},
    {feild: "status", headerName:"Status",width: 90},
    {feild: "view", headerName:"View",width: 90},

  ]

  const data = [{
    id: 1,
    name: "hassan",
    plateform: "twitter",
    status: "very active",
    view: "View"
  },
  {
    id: 2,
    name: "hassan",
    plateform: "twitter",
    status: "very active",
    view: "View"
  },
  {
    id: 2,
    name: "hassan",
    plateform: "twitter",
    status: "very active",
    view: "View"
  }

]
  return (
    <div>
      <AdminNavbar ></AdminNavbar>
     
        <div className='flex'>
          <div className='bg-blue flex  w-auto duration-100md:w-[300px] md:h-[100vh] px-4 '>
            
            <NestedList></NestedList>
          </div>
            <div className='flex flex-col items-center px-14 pt-7 '>
                    <div className='flex  justify-center space-x-2 self-start'>
                      <TextField value={text} onChange={e => setText(e.target.value)}  sx={{width:300,
                       "& .MuiInputBase-root":{
                        height: 30
                       }}
                    }></TextField>
                      <div>
                      <Button onClick={handleClick} className='bg-blue' variant="contained"><SearchIcon></SearchIcon></Button>
                      </div>
                    </div>
                    <div className=' '>
                      
                      <h1 className='font-railway text-blue text-base pr-3'>Influencers</h1>
                      
                      <div className='w-[900px]'>
                      <UsersTable type="influencer"></UsersTable>
                      </div>
                      
                      </div>
          </div>
        </div>

   
    </div>
  )
}

export default Users