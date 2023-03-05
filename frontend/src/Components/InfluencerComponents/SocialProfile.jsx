import React , {useState}from 'react'
import image from "../../images/profile.jpg"
import EditIcon from '@mui/icons-material/Edit';
import DetailBox from '../DetailBox';
import UpdateIcon from '@mui/icons-material/Update';
import { TextField } from '@mui/material';
import MultipleSelect from './MultipleSelect';
import jobSearch from "../../images/jobSearch.png"
import AddConnection from './AddConnection';
const Profile = (onEdit)=>{
    return(
        <div className='flex-[0.6] bg-gray-50 justify-center px-4 py-9'>
            <div
            onClick = {()=>{onEdit()}}
            className='flex space-x-2'>
                <h1 className="text-green font-railway text-sm px-2 py-1 border rounded-full hover:bg-gray-200 ">edit <EditIcon className="text-xs text-grey"></EditIcon></h1>

            </div>
            <div className=' flex flex-col items-center justify-center space-y-2'>
                <img src={image} alt={image} className="w-[150px] h-[150px] rounded-full"/>
                <div className='flex flex-col space-y-0 items-center'>
                    <h1 className='text-black font-railway text-xl'>John Doe</h1>
                    <p className='text-gray-700 font-railway text-xs'>Lorem ispum.............................</p>
                </div>
                <div className='flex flex-col space-y-5 w-[100%]'>
                <hr ></hr>

                    <div className='flex flex-col w-[100%] px-2'>
                        <h1 className='text-blue font-railway text-base'>About </h1>
                        <p className='text-gray-500 font-railway text-xs'> n jansfjn jasfjnasjdnc</p>
                    </div>

                    <hr ></hr>

                    <div className='flex justify-between space-x-1'>
                        <div className='px-2 flex flex-col flex-1 space-y-1'>
                        <h1 className='text-blue font-railway text-base'>Country</h1>
                        <DetailBox data="Pakistan"></DetailBox>
                        </div>
                        <div className='px-2 flex flex-col space-y-1'>
                                <h1 className='text-blue font-railway text-base'>languages </h1>
                                <div className="flex flex-wrap">
                                    <DetailBox data="Urdu"></DetailBox>
                                    <DetailBox data="English"></DetailBox>
                                    
                                </div>
                        </div>
                        
                    </div>
                    <hr ></hr>

                    <div className='px-2 flex flex-col space-y-1'>
                                <h1 className='text-blue font-railway text-base'>Categories </h1>
                                <div className="flex flex-wrap">
                                    <DetailBox data="Urdu"></DetailBox>
                                    <DetailBox data="English"></DetailBox>
                                    
                                </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}



const EditProfile = (onSave)=>{
    return(
        <div className='flex-[0.6] bg-gray-50 justify-center px-4 py-9'>
            <div onClick={()=>{onSave()}} className='flex space-x-2'>
                <h1 className="text-green font-railway text-sm px-2 py-1 border rounded-full hover:bg-gray-200 hover:shadow-md">Save <UpdateIcon className="text-xs text-grey"></UpdateIcon></h1>

            </div>
           
            <div className=' flex flex-col items-center justify-center space-y-2 relative'>
                <label className='absolute top-0 right-20 p-1 text-xs text-grey border rounded-full hover:shadow-md' for="image"> <EditIcon></EditIcon></label>
                <input className='hidden' type="file" id="image"></input>
                <img src={image} alt={image} className="w-[150px] h-[150px] rounded-full"/>
                <div className='flex flex-col space-y-0 items-center'>
                    <h1 className='text-black font-railway text-xl'>John Doe</h1>
                    <p className='text-gray-700 font-railway text-xs'>Lorem ispum.............................</p>
                </div>
                <div className='flex flex-col space-y-5 w-[100%]'>
                <hr ></hr>

                    <div className='flex flex-col w-[100%] px-2'>
                        <h1 className='text-blue font-railway text-base'>About </h1>
                        <TextField
                            id="outlined-multiline-static"
                            
                            multiline
                            rows={5}
                            defaultValue="Default Value"
                            variant='standard'
                            />
                    </div>

                    

                    <div className='flex flex-col space-y-1'>
                        <div className='px-2 flex flex-col flex-1 space-y-1'>
                            <h1 className='text-blue font-railway text-base'>Country</h1>
                            <MultipleSelect></MultipleSelect>
                        </div>
                        <div className='px-2 flex flex-col space-y-1'>
                                <h1 className='text-blue font-railway text-base'>languages </h1>
                                <MultipleSelect></MultipleSelect>
                        </div>
                        
                    </div>
                    <hr ></hr>

                    <div className='px-2 flex flex-col space-y-1'>
                                <h1 className='text-blue font-railway text-base'>Categories </h1>
                                <MultipleSelect></MultipleSelect>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

const InitialOtherDetails = ()=>{
    return(
        <div className='flex-1 bg-white'>
            <div className='flex flex-col items-center justify-center border m-9 py-10 px-8 rounded-3xl' >
                <img className='w-[50%] h-[50%]' src={jobSearch} alt="asjh"></img>
                <h1 className='text-black text-xl font-railway text-center'> Oops! Looks like you have no ongoing campaign</h1>
                <h2 className='text-grey text-sm font-railway text-center'>Lets find some work for you. The campaigns that you are currently working are displayed here</h2>
                <button className='text-center text-blue text-base py-1 border border-blue px-2 mt-2'>Find Work</button>
            </div>
        </div> 
    )
}


const SocialProfile = () => {
    const {open, setOpen}= useState(false)
    const handleEdit = ()=>{
        setOpen(true)
    }
    const handleSave = () =>{
        setOpen(false)
    }
  return (
    <div className='flex'>
        
        {false? <EditProfile onSave={handleSave}/>: <Profile onEdit= {handleEdit}/>}
        <InitialOtherDetails></InitialOtherDetails>

        <div className='flex-[0.75] bg-slate-50 border-l-2 shadow'>
            <AddConnection></AddConnection>
        </div>
    </div>
  )
}

export default SocialProfile