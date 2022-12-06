import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';


import FormTextField from '../Components/FormTextField';
import profileSchema from '../ValidationSchemas/profileSchema';
import Textarea from '../Components/Textarea';
import FormSelect from '../Components/FormSelect';
import ProfileImage from '../Components/ProfileImage';

const style = {
    width:{md:600},
    "& .MuiInputBase-root":{
        height: {sm: 35 ,md:40}
    }

}
const countries = [
    "pakistan",
    "China",
    "India"
]

const languages = [
    "Urdu",
    "English",
    "Hindi",
    "Chinese"
    
]

const platforms = [
    "twitter",
    "instagram"
]



const Profilecompletion = () => {
    const handleSubmit=(values)=>{
        console.log(values)
    }
    
  return (
    <>
    <nav className='container relative px-2 py-6 mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 className='text-black font-railway'>Maven Marketing</h1>

            <Link className='text-blue font-railway  hover:text-grey hover:-translate-y-0.5' to="/">
                Logout
            </Link> 
        </div>

   </nav>
   <Formik
   initialValues={
    {
        name: "",
        country: "",
        language: "",
        discription: "",
        platform: "",
        url: "",
        file:""
    }
   }
   onSubmit = {values=> handleSubmit(values)}
   validationSchema= {profileSchema}
   >
    {formik => (
        <Form>
            <section id ="profileCompletion" className='container mx-auto'>
        <div  className='flex flex-col px-6 py-8 border drop-shadow-sm space-y-5'>
            <div className='space-y-3' >
                <div>
                    <h1 className='font-railway text-xl md:text-2xl'>Profile Completion</h1>
                    <p className='font-Andika text-xs md:text-sm text-grey'>Complete your profile, to start your journey as a content creator and start earning</p>
                </div>
                <div className='border'></div>
            </div>
            <div id = "personal Information" className='flex flex-col space-y-3 pt-1 '>
               
                    <h1 className='text-base text-green font-railway md:text-xl'>Personal Information</h1>
                    
                <div className='flex flex-col space-y-3'>
                    <h1 className='font-railway text-sm md:text-base '>Upload your Profile Pic</h1>
                    <ProfileImage></ProfileImage>

                </div>
                <div className='flex flex-col space-y-2' >
                    <h2  className='font-railway text-sm md:text-base '>Full name</h2>
                    
                    <FormTextField name= "name" label= "Enter your full name"></FormTextField>

                </div>
                <h1  className='font-railway text-sm md:text-base '>Select Country and languages</h1>
                <div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3'>
                   
                <FormSelect data = {countries} name ="country" label="Country" placeholder= 'Country'></FormSelect>
                    <FormSelect data={languages} name="language" label="Language"></FormSelect>
                    

                </div>
               
                <div className='flex flex-col space-y-2' >
                    <h1 className='font-railway text-sm md:text-base '>Discription </h1>
                    {/* <textarea name='discription' id="message" rows="5" class=" resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter discription about your self......"></textarea> */}
                    <Textarea name="discription"></Textarea>
                </div>


                

            </div>
            <div className='border'></div>
            <div className='flex flex-col space-y-4'>
                <div>
                    <h1 className= 'text-base text-green font-railway md:text-xl'>Platform Information</h1>
                   
                </div>
               {/* need to add functionality for multiple feilds */}
               <FormSelect data={platforms} name="platform" label="platform"></FormSelect>
               {/* <TextField required sx={{width : {md:300}}} id="select" label="Plateform" value="0" select>
                        <MenuItem value = "0">Select Plateform</MenuItem>
                        <MenuItem value="10">Twitter</MenuItem>
                        <MenuItem value="20">Instagram</MenuItem>
                </TextField> */}
                <div className='flex flex-col space-y-2' >
                    <h2  className='font-railway text-sm md:text-base '>Social Media Url</h2>
                    <FormTextField name="url" label="Enter your social media profile link"></FormTextField>

                </div>
                
            </div>
           <div>
            {console.log(formik.dirty)}
           <Button type='submit' disabled={!formik.isValid } className={formik.isValid? "bg-blue": "bg-grey text-white"} variant="contained">Submit for verification</Button>

           </div>
        </div>
   </section>
        </Form>
        
    )}
   </Formik>
    </>
    
  )
}

export default Profilecompletion