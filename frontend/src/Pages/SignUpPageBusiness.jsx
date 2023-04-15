import React, {useState} from 'react'
import Navbar from '../Components/Navbar'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { Autocomplete } from '@mui/material';
import {styled} from "@mui/system"
import GoogleSignup from '../Components/GoogleSignup';
import { Formik, Form } from 'formik';
//import profileSchema from '../ValidationSchemas/profileSchema';
import * as yup from 'yup';
import FormTextField2 from '../Components/FormTextFeild2';
import { useNavigate } from 'react-router-dom';
import { Category } from '@mui/icons-material';
import FormSelect2 from '../Components/FormSelect2';
import axios from 'axios';
import { Alert } from '@mui/material';

let SignupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("please enter a valid email").required("Email address is required"),
    password : yup.string().required("Password is required"),
    confirmPass: yup.string().required("Confirm pass is required")
});

const countries = [
    "pakistan",
    "China",
    "India"
]

const category = [
    "Beauty"
]
const Categories = [
    { label: 'Beauty products'},
    { label: 'Mobile' },
    { label: 'Food' }]
   
const Countries = [
    { label: 'Pakistan'},
    { label: 'America' }
    ]
       
const SignUpPageBusiness = () => {

    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit=(values)=>{
        console.log(values)
        var val = {name : values.name, email : values.email, password : values.password, role : "brand"}
        axios.post("http://localhost:3000/brand/register", val, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
        .then(res => {
            console.log(res.data)
            if(res.data.status === 'success'){
                //setUser(res.data.user)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                setErr(true)
                setErrMsg(res.data.message)
            }
            else{
                setErr(true)
                setErrMsg(res.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
  return (
    <Formik
   initialValues={
    {
        email: "",
        name: "",
        password: "",
        confirmPass: "",
    }
   }
   onSubmit = {values=> handleSubmit(values)}
   validationSchema= {SignupSchema}
   >
    {formik => (
        <Form>
             <div>
        <Navbar></Navbar>
        <section className='container mx-auto'>
            {console.log(formik)}
            <div className='px-4 h-96 pt-2 mb-6 space-x-8 sm:flex flex-col-reverse md:flex-row md:pt-1'>
                <div className='flex flex-col justify-center  px-10 space-y-6 md:w-[50%] '>
                    
                    <div>
                        <h1 className='text-left sm:text-lg md:text-xl font-railway'>Sign Up</h1>
                        <p className= "text-sm text-grey">Its quick and easy</p>
                    </div>
                    <div className='flex flex-col space-y-3 '>
                      
                        <FormTextField2 name= "name" label="Business Name"></FormTextField2>
                        <FormTextField2 name= "email" label= "Business Email"></FormTextField2>
                        <FormTextField2 label="Password" name= "password" />
                        <FormTextField2 name= "confirmPass" label="Confirm Password" />
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <div className='flex justify-center pt-1 pr-3'>
                            <Button type='submit' disabled={!formik.isValid } className={formik.isValid? "bg-blue": "bg-grey text-white"} variant="contained">Sign Up</Button>
                            </div >
                        </div>
                    </div>
                </div>
                <div className='flex flex-col  my-5  items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14  md:items-start '>
                    <h1 className='text-3xl text-blue font-semibold font-railway md:text-4xl'>Maven Marketing</h1>
                    <p className='font-semibold text-xl'>An Expert Marketing Solution</p>
                </div>
            </div>
        </section>
        {err && <Alert severity="error" onClose={() => { setErr(false) }} >
            {errMsg}
            {errMsg.includes("verification") && <Button onClick={() => {navigate('/businesslogin')}} style={{marginLeft:30}} color="inherit" variant='contained' size="small">
                Login Page
            </Button>}
        </Alert>}
    </div>
        </Form>
    )}
    </Formik>
  )
}

export default SignUpPageBusiness