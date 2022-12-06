import { SingleCampaign } from './SingleCampaign';
import React from 'react'
import campaigns from './campaigndata'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
const CampaignComponent = () => {
  return (
    <div className=' px-6 pt-4'>
    <div className='flex flex-col space-y-1 px-4 py-1 border'>
      <div className='flex justify-between space-x-1 px-4 py-2 border rounded-sm bg-gray-100'>
        <h1 className='text-sm font-railway md:text-base'>Campaigns</h1>

        <div>
        <FilterAltIcon className='hover:text-blue'/>
        <input placeholder='Search.....' className='rounded-full'></input>
        <SearchIcon className="hover:text-blue"/>
        </div>
      </div>
      <div className='flex flex-col space-y-2 px-6 py-4'>
        {campaigns.map(items=> {return (<div className='flex flex-col space-y-2'>
        <h1 className='font-railway text-blue' >{items.title}</h1>
        <p className='font-Andika text-black text-xs'>{items.disc}</p>
        <ul className='flex flex-wrap  md:w-[400px]'>
          {items.platforms.map(platform=> {
            return (<li className='font-Andika text-white px-2 py-1 mr-1 mb-2 rounded-full text-xxs w-[80px] bg-green text-center'>{platform}</li>
            )
          })}
          

        </ul>
        <hr></hr>

      </div>)})}
      

      </div>
      </div>
      </div>
  )
}

export default CampaignComponent