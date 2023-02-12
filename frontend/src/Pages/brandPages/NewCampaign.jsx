import React from 'react'
import SideBar from "./SideBar"
import NotificationsIcon from '@mui/icons-material/Notifications';
import FormTextField2 from "../../Components/FormTextFeild2"
import FormFeild3 from '../../Components/Formfeild3';
import FormSelect2 from "../../Components/FormSelect2"
import { Formik, Form } from 'formik';
import { TextField , MenuItem, Button} from '@mui/material';
import campaingSchema from '../../ValidationSchemas/campaignSchema';
import Textarea from '../../Components/Textarea';
import campaigns from './campaigndata';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const Feild = ({ props, data})=> {
    return(
        <TextField {...props} required size='small' sx={{width:190}} id="select"  select >
        {data.map(ele => {return(<MenuItem value={ele}>{ele}</MenuItem>)})}
      </TextField>
    )
}
const NewCampaignPage = () => {
    const navigate = useNavigate()

    const handleSubmit = (values)=> {
        // get user email
        var users = localStorage.getItem("user");
        var email = JSON.parse(users).email;
        const newCampaign = {email: email, title:values.title, description: values.description, platform: values.platform, country: values.country, language: values.language }
        //alert("your campaign is being created")
        //alert("Campaign registered successfully")
        //navigate("/businesshome")
        console.log(newCampaign)

        axios.post("http://localhost:3000/brand/create-campaign", newCampaign)
        .then(res => {
            console.log(res)
            //alert("Campaign registered successfully")
            navigate("/businesshome")
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <Formik
   initialValues={
    {
        title: "",
        description: "",
        country: "",
        language: "",
        platform: ""
    }
   }
   onSubmit = {values=> handleSubmit(values)}
   validationSchema= {campaingSchema}
   >
    {formik => (
        <Form>
            <div className='flex'>
        <SideBar></SideBar>
        <div className= 'flex  flex-col pl-16 py-12 md:pl-0 w-[100%]'>
        <div className='flex justify-between  w-[100%] pr-10 pl-2 md:pl-4 md:pr-16'>
          <h1 className='font-railway text-grey text-sm'>Create a new Campaign</h1>
           <NotificationsIcon></NotificationsIcon>
          </div>
          <div className='flex flex-col px-6 mt-5 space-y-3'>
            <div>
                <h1 className='font-railway text-blue text-base md:text-xl '>Create a new campaign to boost up your marketing</h1>
                <p className='font-railway text-grey text-xs'>Just few Step to boost your business sucess</p>
                
            </div>
            <h1 className='font-railway text-green text-base md:text-xl'>Create Campaign</h1>
            <div>
                <h1 style={{marginBottom: 10}} className='font-railway text-xs md:text-sm'>Campaign Title</h1>
                <FormTextField2 name="title" label="Enter Title"></FormTextField2>
            </div>
            <div>
                <h1 className='font-railway text-xs md:text-sm'>Campaign Description</h1>
                <Textarea name= "description" placeholder = "Please Describe what is your business and what is your campaign about" ></Textarea>
            </div>
            <div className='flex space-x-4'>
                <div>
                <h1 className='font-railway text-xs md:text-sm'>Country</h1>
                <FormSelect2 name = "country"   data= {countries}></FormSelect2>
                </div>
                <div>
                <h1 className='font-railway text-xs md:text-sm'>Language</h1>
                <FormSelect2 name = "language"   data= {languages}></FormSelect2>                
                </div>
                
            </div>
            <div>
                <h1 className='font-railway text-xs md:text-sm'>Platforms</h1>
                <FormSelect2 name = "platform"   data= {platforms}></FormSelect2>         
                   </div>
            <Button type='submit' className='bg-blue' variant='contained' >Create Campaign</Button>
        </div>
        </div>
        
    </div>
        </Form>
    )}
    </Formik>
  )
}

export default NewCampaignPage