import React, {useState, useEffect} from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import CampaignCard from "./CampaignCard"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import {useQuery} from "react-query"
import axios from "axios"
import { LineWave } from 'react-loader-spinner';
import { TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
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
  const [query, setQuery] = useState("")
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const [isSearch, setIsSearch] = useState(false)
  const handleOpenSort = ()=> {
    setOpenSort(true)
    console.log("clicked")
    console.log(openSort)
  }

  const {isLoading, data:campaigns, isError, isSuccess, status} = useQuery(["getAllCampaigns"],
    ()=>{
      return axios.get("http://localhost:3000/campaign/campaigns",
      {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })
    },
    {refetchInterval: 20000}
  )

  useEffect(()=>{
    if(status === "success" && !isSearch){
      setData(campaigns.data.data)
    }
  },[campaigns,status])

 const handleSearchChange = (e)=>{
      setQuery(e.target.value)
 }

 const handleSearch = ()=>{
   console.log(data)
   setIsSearch(true)
  if(data != null)
    {
      const filtered = data.filter(item=>{
        
        return (item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.name.toLowerCase().includes(query.toLowerCase())||
        item.description.toLowerCase().includes(query.toLowerCase())||
        item.country?.join("").toLowerCase().includes(query.toLowerCase())||
        item.language?.join("").toLowerCase().includes(query.toLowerCase())||
        item.platform?.join("").toLowerCase().includes(query.toLowerCase())
        )
        

       

      })
      console.log("filtered",filtered)
      setData(filtered)

      

      
    }
 }

  const handleCloseSort =()=>{
    setOpenSort(false)
  }

  

  if(isLoading){
    return (<div className='flex flex-col justify-center items-center'>
      <h1 className='text-xxl font-railway text-black md:text-3xl'>Loading the campaigns</h1>
      <p className='text-base text-grey md:text-xl'>Bid on the campaigns to make your protfolio and earn money</p>
      <div className='flex justify-center'>
      <LineWave
      height="250"
      width="250"
      color="hsl(214,100%,55%)"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
      </div>
      
    </div>)
  }

  if(isError){
    return(<div className='text-2xl h-[80vh] font-railway flex flex-col justify-center items-center'>
      <h1 className='text-xxl font-railway text-black md:text-3xl'>Oppss! Something went Wrong</h1>
      <p className='text-base text-grey md:text-xl'>Please check your internet connect or try again later</p>
    </div>)
  }

  return (
    <div  className="flex flex-col mx-7 my-5 ">
        
        <div className="flex flex-col  space-y-4 mt-4 px-1 md:mt-6 md:px-2">
            <h1 className="text-black font-railway text-lg md:text-xl">All Campaigns</h1>
            {data?.length ===0?<div className='flex flex-col justify-center items-center my-5 '>
                <h1 className='text-3xl font-railway text-grey'>no result found</h1>
                <button onClick={()=>{
                  setIsSearch(false)
                }} classaName="font-railway px-3 py-5 border rounded-full">View More</button>
            </div>:
              <div className='flex flex-wrap mt-2 justify-start space-y-3 md:space-x-3 md:space-y-0'>
              {/* <CampaignCard></CampaignCard> */}
              {data?.map((campaign) =>{
                
                return <CampaignCard 
                avatar={campaign?.brand?.photo}
                title={campaign?.title} 
                brandName= {campaign?.brand?.name}
                banner={campaign?.bannerImg}
                description={campaign?.description}
                id = {campaign["_id"]}
                  ></CampaignCard>
              })}
              
              
            </div>
            }
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