import React, {useState} from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import CampaignCard from "./CampaignCard"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CloseIcon from '@mui/icons-material/Close';


const SortModel = ({onClose})=>{
  return(
    <div className='z-10  absolute top-8 left-40  border  rounded-lg p-1  w-40 md:top-9 md:left-44'>
              <div className='flex justify-end'>
                <CloseIcon onClick={()=> onClose()} className="text-base text-grey hover:text-black"/>
              </div>
                <hr/>
                <div className='flex justify-between  rounded-lg p-1 mt-1 hover:bg-gray-200'>
                
                  <h1 className='text-sm font-railway text-gray-800'>Date</h1>
                  <KeyboardDoubleArrowUpIcon className='text-sm font-railway text-gray-800'></KeyboardDoubleArrowUpIcon>

                </div>
                
                
            </div>
  )
}
const InfluencerAllCampaigns = () => {
  const [openSort, setOpenSort] = useState(false)
  const handleOpenSort = ()=> {
    setOpenSort(true)
    console.log("clicked")
    console.log(openSort)
  }

  const handleCloseSort =()=>{
    setOpenSort(false)
  }

  return (
    <div  className="flex flex-col ">
        <div className='flex space-x-5 relative'>
            <div className='border text-grey text-sm px-2 py-1 font-railway md:px-3 md:py-1 rounded-2xl border-grey hover:shadow-lg'> <TuneIcon></TuneIcon> <span className="">Filter</span>
            </div>
            <div>
            <div onClick={()=>{
              handleOpenSort()
            }} className='border text-grey text-sm px-2 py-1 font-railway md:px-3 md:py-1 rounded-2xl border-grey hover:shadow-lg'> <SortIcon></SortIcon> <span>Sort</span>
              
            </div>
            {openSort && <SortModel onClose={handleCloseSort}></SortModel>}
            
            </div>
            
            
        </div>
        <div className="flex flex-col  space-y-4 mt-4 px-1 md:mt-6 md:px-2">
            <h1 className="text-black font-railway text-lg md:text-xl">All Campaigns</h1>
            <div className='flex flex-wrap mt-2 justify-center'>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
              <CampaignCard></CampaignCard>
            </div>
            <hr></hr>
            <div className=" flex justify-center mt-8 pt-4 space-x-3">
                <button className='border px-2 py-1 border-grey text-grey rounded-full hover:shadow-lg'>Previous</button>
                <button className='border px-2 py-1 border-grey text-grey rounded-full hover:shadow-lg'>Next</button>
            </div>
        </div>
    </div>
  )
}

export default InfluencerAllCampaigns