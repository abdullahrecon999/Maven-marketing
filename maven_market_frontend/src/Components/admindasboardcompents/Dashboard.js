import React from 'react'
import Box from './Box'
import Users from './Chart'

const Dashboard = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex space-x-12 justify-center items-center py-5 px-14'>
        <Box title = "Total Users" ></Box>
        <Box title = "Activation Requests" ></Box>
        <Box title = "Influencers" ></Box>
        <Box title = "Brands" ></Box>
        </div>
        <Users></Users>

    </div>
  )
}

export default Dashboard