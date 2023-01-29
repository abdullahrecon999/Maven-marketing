import React,{useContext} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../utils/authProvider";

const AdminNavbar = ({authenticated}) => {
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // do axios get to backend for logout
    // then redirect to home page
    await axios.get("http://localhost:3000/admin/logout", { withCredentials: true }).then(res => {
      console.log(res)
      setUser(null)
      localStorage.removeItem('user')
      navigate("/")
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <nav className='container relative px-2 py-6 mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 onClick={()=> navigate("/")} className='text-black font-railway'>Maven Marketing</h1>

            {authenticated?
            <button onClick={()=> {logout()}} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'>Logout</button> :
            <button onClick={()=> navigate("/")} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'>Home</button>
          }
        </div>

   </nav>
  )
}

export default AdminNavbar