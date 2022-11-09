import React from 'react'
import {Link} from "react-router-dom"
const AdminNavbar = () => {
  return (
    <nav className='container relative px-2 py-6 mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-black font-railway'>Maven Marketing</h1>

            <Link className='text-blue font-railway  hover:text-grey hover:-translate-y-0.5' to="/">
                Home
            </Link> 
        </div>

   </nav>
  )
}

export default AdminNavbar