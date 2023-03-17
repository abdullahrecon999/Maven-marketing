import React from 'react'
import TextField from '@mui/material/TextField';
import GoogleSignup from './GoogleSignup';
import { Formik } from 'formik';
import loginSchema from '../ValidationSchemas/loginSchema'
import { useNavigate } from 'react-router-dom';

const LoginModalBrand = ({visible, onClose}) => {

    const navigate = useNavigate();
    const login = (email, password)=> {
        navigate("/influencerhome")


       

    }

    const handleClose = (e)=>{
        if(e.target.id === 'container') onClose();
        
    }
    if(!visible)
        return null;
  return (
    <Formik
      initialValues={{ email: '' , password: ""}}
      validateOnMount = {true}
      onSubmit ={values=> login(values.email, values.password)}
      validationSchema= {loginSchema}s
      >
        {({ handleChange, handleBlur, handleSubmit,touched,errors,isValid, values }) => (
    
    <div  id='container' onClick={handleClose} className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-30'>
       <div className='flex flex-col bg-white px-10 py-8 border rounded-lg space-y-4 drop-shadow-lg'>
            <div>
            <h1 className='text-base font-bold font-railway'>Welcome!</h1>
            <p className='text-xs text-grey'>Enter Details to login your Influencer account</p>
            </div>
            <div className='flex flex-col space-y-6'>
                <TextField onChange={handleChange('email')} onBlur={handleBlur('email')} required size='small' id="outlined-basic" label="Enter Email"  variant="outlined" />
                <TextField onChange={handleChange('password')} onBlur={handleBlur('password')} size='small' id="outlined-basic" label="Enter password" variant="outlined" />
                <div className='flex justify-center pt-1 '>
                    <button onClick={()=> navigate("/influencerhome")} className='px-5 py-2  font-bold text-center text-white rounded-full drop-shadow-md text-xs justify-center items-center md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Login</button>
                                
                </div >
            </div>
            <p className='text-center text-xs text-grey'>or</p>
            <GoogleSignup></GoogleSignup>
            
       </div>
    </div>
    )}
    </Formik>

  );
  
}

export default LoginModalBrand 