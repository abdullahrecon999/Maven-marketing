import React, {useState} from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';



const AdminLogin = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: "",
        password:""
    });
    
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    
    }

    const login = ()=>{
        if (state.email === "h@g.com" && state.password === "abc"){
            navigate("/admin/home")
        }
        else{
            <Alert severity="error">This is an error alert — check it out!</Alert>

        }
            
    }
  return (
    <>
    <nav className='container relative px-2 py-6 mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-black font-railway'>Maven Marketing</h1>

            <Link className='text-black font-railway  hover:text-blue hover:-translate-y-0.5' to="/">
                Home
            </Link> 
        </div>

   </nav>
    <section className='flex justify-center items-center p-20'>
        <div className='flex flex-col space-y-4 items-center border border-grey py-7 px-3 rounded-lg drop-shadow-sm'>
            <h1>Admin Login</h1>
            <div className='flex flex-col space-y-4'>
           
                <TextField onChange={handleChange} name='email' size='small' id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={handleChange} name="password" size='small' id="outlined-basic" label="Password" variant="outlined" />
            
            </div>
            <div>
           
            <Button onClick={login} variant="contained">Log in</Button>
            </div>




        </div>

    </section>
    </>
    
  )
}

export default AdminLogin