import React , {useEffect, Suspense , useState}from 'react'
import { useParams } from 'react-router-dom'
import NestedList from '../Components/AdminDashboardList'
import AdminNavbar from '../Components/AdminNavbar'
import ProfileImage from '../Components/ProfileImage'
import { Button } from '@mui/material'
import uImage from "../images/profile.jpg"
import axios from 'axios'
import {useQuery} from "@tanstack/react-query"
import DetailBox from '../Components/DetailBox'
const Profile = ({id})=> {

    const [state, setState] = useState(true)
    const handleClickActivate = async ()=> {
        // send a requests to activate
         axios.post("http://localhost:3000/admin/activateProfile/"+id,
        {headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
        
        )
        setState(false)
    }
    const handleClickdeactivate = ()=> {
        // send a requests to deactivate
        setState(true)
    }
    const url= "http://localhost:3000/admin/influencer/"+id
    const {isLoading, data, isError, isSuccess} = useQuery(["getting the data"],
    ()=>{
       
      return axios.get(url,
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
   
  )

  console.log(data.data.data)
    return(
        <div className='w-[900px] px-12 py-8'>
        <div className='flex flex-col space-y-3'>
            <h1 className="text-blue font-andika text-4xl">Influencer details page</h1>
            <h1 className='text-green font-railway text-xl'>Personal Details</h1>
            <div>
                <img 
                
                className=' border rounded-full max-h-[80px] max-w-[80px] md:max-h-[130px] md:max-w-[130px]' 
                src={data.data.data?.photo} 
            
                alt="hot potato"/>
            </div>
            <h1 className='text-black font font-railway text-base'> Name: <span className='font-bold text-grey'>{data.data.data?.name}</span></h1>
            <div className='flex  flex-col '>
                <div className='flex flex-col space-y-3'>
                        <h1 className='font-railway text-lg'>
                            Country
                        </h1>
                        <DetailBox data={data?.data?.data?.country[0]}/>

                </div>
                <div className='flex flex-col'>
                        <h1 className='font-railway text-lg'>
                            Languages
                        </h1>
                        <div className='flex flex-wrap w-[500px]'>
                            {data?.data?.data?.language.map(items =>{
                                return <DetailBox data={items}/>
                            })}

                        </div>
                        
                </div>
            </div>
            <div className='space-y-2'>
                <h1 className='font-railway text-lg'>Description</h1>
                <p className='font-Andika text-sm text-grey'>{data?.data?.data?.discription}</p>

            </div>
            <div>
                <h1 className='font-railway text-lg'>Profile Status</h1>
                <p className='font-railway text-base text-blue'>Pending</p>
            </div>
            </div>
            <h1 className='text-green font-railway text-xl mt-3'>plateform Details</h1>
            <div className='flex flex-col space-y-3'>
                        <div>
                        <h1 className='font-railway text-lg'>
                            Platforms
                        </h1>
                        <h1 className='font-railway text-base text-grey'>twitter</h1>
                        </div>
                        <div>
                        <h1 className='font-railway text-lg'>
                            links
                        </h1>
                        <h1 className='font-railway text-base text-grey' >twitter</h1>
                        </div>
            </div>
            <div className='mt-3'>
            {!state && <Button onClick={handleClickdeactivate} className='bg-blue' variant='contained' >Deactivate profile</Button>}
                {state && <Button onClick={handleClickActivate} className='bg-blue' variant='contained' >Activate profile</Button>}
            </div>


        </div>
    )
}
const InfluencerDetails = () => {
    let {id} = useParams()
    console.log(id)
    
   
  return (
    <div>
        <AdminNavbar></AdminNavbar>
        <div className='flex'>
            <div className='bg-blue flex   duration-100md:w-[300px] md:h-[100vh] px-4 '>
                
                <NestedList></NestedList>
            </div>
            <div>
                <Suspense fallback={<div> loading</div>}>
                    <Profile id = {id}/>
                </Suspense>
            </div>
        </div>

    </div>
  )
}

export default InfluencerDetails