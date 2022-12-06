import React from 'react'
import Navbar from '../Components/Navbar'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { Autocomplete } from '@mui/material';
import {styled} from "@mui/system"
import GoogleSignup from '../Components/GoogleSignup';
import { Formik, Form } from 'formik';
import profileSchema from '../ValidationSchemas/profileSchema';
import FormTextField2 from '../Components/FormTextFeild2';
import { useNavigate } from 'react-router-dom';
import { Category } from '@mui/icons-material';
import FormSelect2 from '../Components/FormSelect2';
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
    const handleSubmit=(values)=>{
        console.log(values)
    }
    const navigateToVerificationPage = ()=> {
        navigate("/verify");
    }
  return (
    <Formik
   initialValues={
    {
        email: "",
        name: "",
        category: "",
        country: "",
        password: "",
       
    }
   }
   onSubmit = {values=> handleSubmit(values)}
   validationSchema= {profileSchema}
   >
    {formik => (
        <Form>
             <div>
        <Navbar></Navbar>
        <section className='container mx-auto'>
            
            <div className='px-4 pt-2  mb-6 space-x-8 sm:flex flex-col-reverse md:flex-row md:pt-1'>
                <div className='flex flex-col justify-center  px-10 space-y-6 md:w-[50%] '>
                    
                    <div>
                        <h1 className='text-left sm:text-lg md:text-xl font-railway'>Sign Up</h1>
                        <p className= "text-sm text-grey">Its quick and easy</p>
                    </div>
                    <div className='flex flex-col space-y-3 '>
                      
                    <FormTextField2 name= "email" label= "Business Email"></FormTextField2>
                    <FormTextField2 name= "name" label="Business Name"></FormTextField2>
                    <FormTextField2 name= "contact" label="Contact number"></FormTextField2>
                       
                        <div className='flex space-x-5 '>
                        <FormSelect2 data = {countries} name ="country" label="Country" placeholder= 'Country'></FormSelect2>

                        {/* <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            options={Categories}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Category" />
                            }
                        /> */}
                        <FormSelect2 data = {category} name ="category" label="category" placeholder= 'category'></FormSelect2>
                        {/* <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            options={Countries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Countries" />
                            } */}
                     
                        {/* <select className='w-[50%] border-grey border rounded-md h-10 px-2 blur-0'>
                            <option value="0">Brand Category</option>
                            <option value="1">Audi</option>
                        
                        </select> */}
                        
                        {/* <select className='w-[50%] border-grey border rounded-md h-10 px-2'>
                            <option value="0">Country</option>
                            <option value="1">Audi</option>
                        
                        </select> */}
                        
                        </div>
                        <FormTextField2  label="Password" name= "password" />
                        <TextField size='small' id="outlined-basic" label="Confirm Password" variant="outlined" />
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <div className='flex justify-center pt-1 pr-3'>
                            <Button type='submit' disabled={!formik.isValid } className={formik.isValid? "bg-blue": "bg-grey text-white"} variant="contained">Sign Up</Button>
                                
                            </div >
                            <p className='font-railway text-sm text-grey'>or</p>
                            <GoogleSignup></GoogleSignup>
                        </div>
                       
                    </div>
                   
               
                    
                </div>
                <div className='flex flex-col  my-5  items-center sm:pt-5 sm:pb-5 md:space-y-1 md:pt-14  md:items-start '>
                    <h1 className='text-3xl text-blue font-semibold font-railway md:text-4xl'>Maven Marketing</h1>
                    <p className='font-semibold text-xl'>An Expert Marketing Solution</p>
                    {/* <div className='flex items-center justify-start space-x-2'>
                        
                       <h1><Person3Icon></Person3Icon></h1> 
                       <h1 className='text-xl font-semibold'>Find and work with the <span className='text-green'>Right Influencer</span> for your brand</h1>
                        
                    </div> */}

                    {/* <div className='flex justify-start space-x-2'>
                        
                        <h1><CampaignIcon></CampaignIcon></h1> 
                        <h1 className='text-xl font-semibold'>Create and <span className='text-blue'>Automate</span> your Campaign more <span className='text-green'>Efficiently</span></h1>
                         
                     </div>
                     <div className='flex justify-start space-x-2'>
                        
                        <h1><SummarizeIcon></SummarizeIcon></h1> 
                        <h1 className='text-xl font-semibold'>Get regulat <span className='text-blue'>Reports and Analytics</span> on your campaigns</h1>
                         
                     </div>

                     <div className='flex justify-start space-x-2'>
                        
                        <h1><MonetizationOnIcon></MonetizationOnIcon></h1> 
                        <h1 className='text-xl font-semibold'>Turn Influencer marketing into your top <span className='text-green'>Revenue Driving Source</span></h1>
                         
                     </div> */}
                </div>
            </div>
        </section>
    </div>
        </Form>
    )}
    </Formik>
  )
}

export default SignUpPageBusiness