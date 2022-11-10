import React from 'react'
import Dashboard from '../Components/admindasboardcompents/Dashboard'
import NestedList from '../Components/AdminDashboardList'
import AdminNavbar from "../Components/AdminNavbar"


const AdminHome = () => {
  return (
    <div>
      <AdminNavbar ></AdminNavbar>
      <section className='flex flex-1 bg-slate-100'>
        <div className='flex '>
          <div className='bg-blue flex  w-auto duration-100md:w-[300px] px-4'>
            
            <NestedList></NestedList>
          </div>
          <Dashboard></Dashboard>
        </div>

      </section>
    </div>
  )
}

export default AdminHome