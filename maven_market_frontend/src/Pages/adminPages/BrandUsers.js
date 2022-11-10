import React from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import NestedList from '../../Components/AdminDashboardList'

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
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

const BrandUsers
 = () => {
  return (
    <div>
      <AdminNavbar ></AdminNavbar>
     
        <div className='flex'>
          <div className='bg-blue flex  w-auto duration-100md:w-[300px] md:h-[100vh] px-4 '>
            
            <NestedList></NestedList>
          </div>
            <div className='flex flex-col items-center px-14 pt-7 bg-orange-400 '>
          <div className='flex flex-col bg-white py-7 px-8 mb-12 '>
            <h1 className='font-railway text-blue text-base'>Brands</h1>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell className='text-blue'>Date Joined</TableCell>
                    <TableCell className='text-blue' >Id</TableCell>
                    <TableCell className='text-blue'>Name</TableCell>
                    <TableCell className='text-blue'>category</TableCell>
                    <TableCell className='text-blue'>Status</TableCell>
                    <TableCell className='text-blue' align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow  key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.shipTo}</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell align="right"><Link>View</Link></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            
    </div>
          </div>
        </div>

   
    </div>
  )
}

export default BrandUsers