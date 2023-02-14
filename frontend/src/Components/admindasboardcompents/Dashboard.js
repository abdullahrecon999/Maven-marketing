import React from 'react'
import Box from './Box'
import Users from './Chart'
import axios from 'axios'
import {useQuery} from "@tanstack/react-query"


const Dashboard = () => {

  const {isLoading, data:dashboardData, isError, isSuccess} = useQuery(["getting the data"],
    ()=>{
      return axios.get("http://localhost:3000/admin/dashboard",
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    }
  )

  return (
    <div className='flex flex-col'>
        <div className='flex space-x-12 justify-center items-center py-5 px-14'>
        
            {isLoading? <h1 className="text-blue font-xl font-extrabold font railway ">Loading</h1>:
            <>
              <Box title = "Total Users" data = {dashboardData?.data.val?.total} ></Box> 
              <Box title = "Activation Request" data = {dashboardData?.data.val?.activationRequests} ></Box> 
              <Box title = "Influencers" data = {dashboardData?.data.val?.influencers} ></Box> 
              <Box title = "Brands" data = {dashboardData?.data.val?.brands} ></Box> 
            </>}
            
            
            
          
        </div>
        {isError && <h1 className="text-red-600">ooooopss!! something went wrong</h1>}
        {isSuccess && <Users data= {dashboardData?.data?.users}></Users>}

    </div>
  )
}

export default Dashboard