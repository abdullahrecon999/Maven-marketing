import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import {styled} from "@mui/system"
import image from "../images/profile.jpg"
import Button from '@mui/material/Button';
import Select from '@mui/material/Select'
import MenuItem from "@mui/material/MenuItem"
import InputLable from "@mui/material/InputLabel"
import { Formik } from 'formik';
import FormTextField from '../Components/FormTextField';
import FormSelect from '../Components/FormSelect';
const style = {
    width:{md:600},
    "& .MuiInputBase-root":{
        height: {sm: 35 ,md:40}
    }

}
const countries = [
    {value: 1,
    name: "Pakistan"
    },
    {value: 2,
        name: "China"
    }
]

const languages = [
    "Urdu",
    "English",
    "Hindi",
    "Chinese"
    
]



const Profilecompletion = () => {
    const [uImage, setImage] = useState(image)
    const imageHandler = (e)=> {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
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
                    <div>
                    <img 
                    onChange={imageHandler}
                    className=' border rounded-full max-h-[80px] max-w-[80px] md:max-h-[130px] md:max-w-[130px]' 
                    src={uImage} 
                    alt={uImage}/>
                    </div>
                    
                    <input id= "uImage" accept='image/*' type="file"></input>

                </div>
                <div className='flex flex-col space-y-2' >
                    <h2  className='font-railway text-sm md:text-base '>Full name</h2>
                    
                    <FormTextField name= "name" label= "Enter your full name"></FormTextField>

                </div>
                <h1  className='font-railway text-sm md:text-base '>Select Country and languages</h1>
                <div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3'>
                    
                    <TextField required 
                    sx={
                        {width : {sm: 500 ,md:300}}} id="select" label="country" value="0" select>
                        <MenuItem value = "0">Select Country</MenuItem>
                        {countries.map(country => {
                            return (<MenuItem value={country.value}>{country.name}</MenuItem>)
                        })}
                    </TextField>

                    <TextField required sx={{width : {md:300}}} id="select" label="Language" value="0" select>
                        <MenuItem value = "0">Select languages</MenuItem>
                        <MenuItem value="10">Ten</MenuItem>
                        <MenuItem value="20">Twenty</MenuItem>
                    </TextField>
                    

                </div>
               
                <div className='flex flex-col space-y-2' >
                    <h1 className='font-railway text-sm md:text-base '>Discription </h1>
                    <textarea id="message" rows="5" class=" resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter discription about your self......"></textarea>

                </div>


                

            </div>
            <div className='border'></div>
            <div className='flex flex-col space-y-4'>
                <div>
                    <h1 className= 'text-base text-green font-railway md:text-xl'>Platform Information</h1>
                   
                </div>
               {/* need to add functionality for multiple feilds */}
               <TextField required sx={{width : {md:300}}} id="select" label="Plateform" value="0" select>
                        <MenuItem value = "0">Select Plateform</MenuItem>
                        <MenuItem value="10">Twitter</MenuItem>
                        <MenuItem value="20">Instagram</MenuItem>
                </TextField>
                <div className='flex flex-col space-y-2' >
                    <h2  className='font-railway text-sm md:text-base '>Social Media Url</h2>
                    <FormTextField name="url" label="Enter your social media profile link"></FormTextField>

                </div>
                
            </div>
           <div>
           <Button className='bg-blue' variant="contained">Submit for verification</Button>

           </div>
        </div>
   </section>
    </>
    
  )
}

export default Profilecompletion