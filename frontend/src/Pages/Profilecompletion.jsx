import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Formik, Form } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormTextField from '../Components/FormTextField';
import profileSchema from '../ValidationSchemas/profileSchema';
import Textarea from '../Components/Textarea';
import FormSelect from '../Components/FormSelect';
import ProfileImage from '../Components/ProfileImage';
import axios from 'axios';
import { AuthContext } from '../utils/authProvider';
import image from "../images/profile.jpg"
import {useMutation} from "react-query"
import { TailSpin } from 'react-loader-spinner';
// need to add multiple array in coutries language and categories
const style = {
    width:{md:600},
    "& .MuiInputBase-root":{
        height: {sm: 35 ,md:40}
    }
}
const countries = [
    "pakistan",
    "China",
    "India",
    "USA",
    "England",
    "Russia"
]



const languages = [
    "Urdu",
    "English",
    "Hindi",
    "Chinese",
    "Russian"

]
const platforms = [
    "Instagram",
    "Youtube",
    "Tiktok",
    "Facebook",
    "Twitter",
    "Snapchat",
    "Linkedin",
    "Pinterest"
  ]


  const categories = [
    "Influencer Marketing",
    "Email Marketing",
    "Blog Writing",
    "Photography",
    "Design",
    "Audio"
  ]
const Profilecompletion = () => {
    
    const navigate = useNavigate();
    const [url, setUrl] = useState("")
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = useState("")
    const [done, setDone] = useState(false)

    const {user, setUser} = React.useContext(AuthContext)
   
    const verifyProfile = () => {
        // verify profile by post call on server
        console.log("verify profile")
        console.log(url)
        setLoading(true)
        axios.post("http://localhost:3000/users/verify", {
            url: url
        })
        .then(res => {
            if (res.data === "Real") {
                console.log(res)
                setLoading(false)
                setDone(true)
                setMsg("Profile Verified")
            } else {
                console.log(res)
                setLoading(false)
                setDone(true)
                setMsg("Profile is not Verified")
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            setDone(true)
            setMsg("Error Occured")
        })
    }

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

    const handleChange = (event) => {
        setUrl(event.target.value);
    };

    

    const addData= async (values) =>{
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(values.language)
        const val = {
            
            
            country: values.country,
            language: values.language,
            description: values.discription,
            platforms: values.platform,
            url: values.url,
            photo: values.uImage,
            profileComplete: 1,
            category: values.category
        }
       
        return await axios.post(`http://localhost:3000/influencer/completeProfile/${user["_id"]}`, val, {headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
    }
    const{mutate, isLoading, isSuccess, isError} = useMutation(addData)
    
    // const handleSubmit= async(values)=>{
    //    const user = JSON.parse(localStorage.getItem("user"))
    //     const val = {
            
            
    //         country: values.country,
    //         language: values.language,
    //         description: values.discription,
    //         platform: values.platform,
    //         url: values.url,
    //         photo: values.uImage,
    //         profileComplete: 1
    //     }
        
    //     const id = user["_id"]
    //     console.log(id);
    //     await axios.post(`http://localhost:3000/influencer/completeProfile/${user["_id"]}`, val, {headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       withCredentials: true,
    //     })
      
        
    // }

    if(isLoading)
        return (
                    <div className='flex justify-center items-center w-[100%] h-[100%] flex-col'>
                        <h1 className='font-railway text-3xl text-blue'>Please wait</h1>
                        <p className='fonet-railway text-base text-grey'>We are we submitting your profile for verification this may take a while</p>
                    </div>
                
        )
    // add the error handling here
    if(isError){}

   
    
  return (
    <>
    <nav className='container relative px-2 py-6 mx-auto'>
        <div className='flex items-center justify-between'>
            <h1 onClick={() => {navigate(-1)}} className='text-black font-railway'>Maven Marketing</h1>

            <h1 onClick={() => {logout()}} className='text-blue font-railway  hover:text-grey hover:-translate-y-0.5'>
                Logout
            </h1> 
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
        uImage:"",
        category: ""
    }
   }
   onSubmit = {values=> mutate(values)}
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
                    <h1 className='font-railway text-sm md:text-base '>Upload your Profile Pic <span className='text-xl text-red-500'>*</span></h1>
                    <ProfileImage name = "uImage" setvalue = {formik.setFieldValue}></ProfileImage>
                    <div className='space-y-3'>
        
                
                
            </div>
                {console.log(formik.values)}
                </div>
                <div className='flex flex-col space-y-2' >
                    <h2  className='font-railway text-sm md:text-base '>Full name <span className='text-xl text-red-500'>*</span></h2>
                    
                    <FormTextField required name= "name" label= "Enter your full name"></FormTextField>

                </div>
                <h1  className='font-railway text-sm md:text-base '>Select Country and languages <span className='text-xl text-red-500'>*</span></h1>
                <div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3'>
                   
                <FormSelect data = {countries} setvalue = {formik.setFieldValue} name ="country" label="Country" placeholder= 'Country'></FormSelect>
                    <FormSelect data={languages} setvalue = {formik.setFieldValue} name="language" label="Language"></FormSelect>
                    

                </div>
               
                <div className='flex flex-col space-y-2' >
                    <h1 className='font-railway text-sm md:text-base '>Description <span className='text-xl text-red-500'>*</span></h1>
                    {/* <textarea name='discription' id="message" rows="5" class=" resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter discription about your self......"></textarea> */}
                    <Textarea name="discription"></Textarea>
                </div>    

            </div>
            <div className='border'></div>
            <div className='flex flex-col space-y-4'>
                <div>
                    <h1 className= 'text-base text-green font-railway md:text-xl'>Platform Information <span className='text-xl text-red-500'>*</span></h1>
                   
                </div>
               {/* need to add functionality for multiple feilds */}
               <FormSelect data={platforms} setvalue = {formik.setFieldValue} name="platform" label="platform" ></FormSelect>
               <div>
                    <h1 className= 'text-base text-green font-railway md:text-xl'>Category <span className='text-xl text-red-500'>*</span></h1>
                   
                </div>
               {/* need to add functionality for multiple feilds */}
               <FormSelect data={categories} setvalue = {formik.setFieldValue} name="category" label="category" ></FormSelect>
              
                <div className='flex flex-col space-y-2' >
                    <h2  className='font-railway text-sm md:text-base '>Social Media Url <span className='text-xl text-red-500'>*</span></h2>
                    {/* <FormTextField name="url" label="Enter your social media profile link"></FormTextField> */}
                    <div className='flex flex-row space-x-4'>
                       
                        <FormTextField name="url"></FormTextField>
                        
                    </div>
                </div>
                
            </div>
           <div>
         
                <Button type='submit' disabled={!formik.isValid } className={formik.isValid? "bg-blue": "bg-grey text-white"} variant="contained">{loading?<TailSpin
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                />:"Submit"}</Button>
                {/* {console.log(formik)} */}
                {/* needs to be fixed */}
                <div className= {isSuccess && !isError? "flex flex-col mt-2":"hidden"}>
                    <h1 className='text-xl font-railway text-red-600'>Profile submitted Successfully</h1>
                    <p className='text-base font-railway text-grey'>Pleas wait while our system verfies your profile, try to login after some time</p>

                </div>
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