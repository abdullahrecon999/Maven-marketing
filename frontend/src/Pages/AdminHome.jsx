import React, {useContext, useState} from 'react'
import Dashboard from '../Components/admindasboardcompents/Dashboard'
import NestedList from '../Components/AdminDashboardList'
import AdminNavbar from "../Components/AdminNavbar"
import {AuthContext} from "../utils/authProvider";

const AdminHome = () => {
  const {user, setUser} = useContext(AuthContext);
  
  return (
    <div>
      <AdminNavbar authenticated={true}></AdminNavbar>
      <section className='flex flex-1 bg-slate-100'>
        <div className='flex border shadow-inner '>
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