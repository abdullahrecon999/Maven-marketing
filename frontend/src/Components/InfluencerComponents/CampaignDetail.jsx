import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useMutation } from "react-query"
import axios from "axios"
import HelpIcon from '@mui/icons-material/Help';
import BidModal from './BidModal';
import Loader from './Loader';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import BidsTable from './table';
import InfluencerGenaricModal from "./InfluencerGenaricModal"
import CloseIcon from '@mui/icons-material/Close';
import DetailBox from './DetailBox';
import { TailSpin } from 'react-loader-spinner';
import CampaignAcceptedList from '../brandComponents/campaignAcceptedList';
import ContractModel from "../brandComponents/ContractModel"
import { Image } from 'antd';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Campaign Title',
    width: 150,

  },
  {
    field: 'brandName',
    headerName: 'Influencer Name',
    width: 150,

  },
  {
    field: 'submittedAt',
    headerName: 'Recieved At',

    width: 110,

  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
  }
];

const Detail = ({ text }) => {
  return (<h1 className='px-2 text-center py-1 rounded-full  text-grey border border-grey'>
    {text}
  </h1>)
}

const CampaignQuestions = ({ text, i }) => {
  return (<h1 className='border-b-2 py-2 px-3 w-[100%] text-black font-railway text-base'><HelpIcon></HelpIcon> {i + 1}. {text}</h1>)
}


const InfluencerBidsDetailModal = ({ handleClose, id }) => {

  const { isLoading, data, isError, isSuccess } = useQuery(["getbiddetails"],
    () => {
      return axios.get(`http://localhost:3000/brand/getbiddetails/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
    }
  )

  const handlebidAccept = () => {
    console.log("the id in mutate is", id)
    return axios.post(`http://localhost:3000/brand/bid/accept/${id}`, {
      accepted: false,
      rejected: true
    },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })
  }



  const { mutate, isLoading: isAccepting, isSuccess: isAcceptingSuccess, status } = useMutation(handlebidAccept)

  return (<InfluencerGenaricModal>

    <div className='h-full'>

      <div className='flex justify-end bg-slate-200'>
        <CloseIcon onClick={() => {
          handleClose()
        }} className=" hover:bg-slate-100"></CloseIcon>
        {console.log("the id of the bid is", id)}
      </div >

      <div className='flex flex-col space-y-5 flex-1'>
        <h1 className='text-3xl text-bold bg-slate-100 text-gray-800 font-railway'>Proposal Details</h1>
        <div className='h-full  flex flex-col px-6  space-y-3'>
          <h1 className="text-2xl text-gray-700  font-railway">{data?.data?.data?.sender?.name}</h1>
          <div className='flex-1 min-h-[20vh]'>
            <p>{data?.data?.data?.discription}</p>
          </div>

          <div className='flex justif-between'>
            <div className="w-[50%] space-y-2">
              <h1 className="text-xl text-gray-700 font-railway">Category</h1>
              <div className="flex flex-wrap space-x-3 ">
                {

                  data?.data?.data?.sender?.category.map(item => {

                    return <Detail text={item}></Detail>
                  })
                }
              </div>
            </div>
            <div className="w-[50%] space-y-2">
              <h1 className="text-xl text-gray-700 font-railway">Platform</h1>
              <div className="flex flex-wrap space-x-3 ">
                {

                  data?.data?.data?.sender?.category.map(item => {

                    return <Detail text={item}></Detail>
                  })
                }
              </div>
            </div>
          </div>

          <div className='place-self-stretch space-x-3'>
            <button className='bg-green px-3 py-2 rounded-full text-white'>View Profile</button>
            <button disabled={isAcceptingSuccess} className='bg-blue px-3 py-2 rounded-full text-white' onClick={(id) => {
              mutate(id)
            }}> {isAccepting ? <TailSpin
              height="20"
              width="20"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> : "Accept Bid"}</button>
          </div>
          {console.log(status)}
          {status === "success" && <p className="text-red-500">Bid Accepted successfull</p>}
        </div>
      </div>
    </div>

  </InfluencerGenaricModal>)

}

const CampaignDetailInfluencer = () => {
  const { state } = useLocation()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({})
  const [bidsdata, setData] = useState({})
  const [close, setClose] = useState(false)
  const [id, setId] = useState("");
  const [contract, setOpenContract] = useState(false)
  const [bidId, setBidId] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
  }, [])

  const handleClose = () => {
    setOpen(!open)
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleBidOpen = (id) => {
    setId(id);
    setClose(true)
  }

  const handleBidClose = () => {
    setClose(!close)
  }

  const handleOpenContract = (id) => {
    setBidId(id)

    setOpenContract(true)

  }
  const handleCloseContract = () => {
    setOpenContract(!contract)
  }

  const { isLoading: bidsIsloading, data: bids, isError: bidsIsError } = useQuery(["getallbids"],
    () => {
      return axios.get(`http://localhost:3000/brand/getallbids/${state.id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
    }
    ,

  )
  const { isLoading, data, isError, isSuccess } = useQuery(["getCampaignDetails"],
    () => {
      return axios.get(`http://localhost:3000/campaign/campaigns/details/${state.id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
    }
  )

  const { isLoading: acceptedBidsLoading, data: acceptedBids } = useQuery(["getacceptedbids"],
    () => {
      return axios.get(`http://localhost:3000/brand/getacceptedbids/${state.id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
    }
  )

  const { data: inviteInfluencer } = useQuery(["getInviteInfluencer"], () => {
    return axios.get("http://localhost:3000/brand/inviteinfluencers")
  })

  const { mutate, isSuccess: isinviteSuccess } = useMutation((val) => {
    return axios.post("http://localhost:3000/brand/sendinvite", val)
  })
  useEffect(() => {
    console.log(user)
    if (isSuccess) {
      const data = bids?.data.data.map((item, i) => {

        return {
          id: item["_id"],
          title: item?.campaignId?.title,
          brandName: item?.sender?.name,

          submittedAt: item?.updatedAt,
          status: "Pending"

        }
      })

      setData(data)
    }
  }, [bids?.data?.data])



  if (isLoading) {
    return (<div className='h-screen flex justify-center items-center'>
      <Loader title="Please wait" subtitle="Campaign details are being loaded" />
    </div>)
  }

  if (isError) {
    return (
      <div> errorrr</div>
    )
  }
  return (

    <div className='relative container mx-auto my-16'>
      {state?.invite && <div className='fixed w-[100%] bg-white shadow-xl flex justify-end items-center -mx-5 px-9 py-4 space-x-1'>

        <h1 className='text-base text-grey '>Accept or decline the invite?</h1>
        <div className='flex space-x-3 px-4'>
          <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Accept</button>
          <button className='text-center text-white bg-green border shadow-lg font-railway px-2 py-1 rounded-full hover:bg-grey'>Decline</button>
        </div>
      </div>}

      {open && <BidModal data={data.data.data.questions} brand={data.data.data.brand["_id"]} id={data.data.data["_id"]} onClose={handleClose}></BidModal>}
      <div className='flex flex-col space-y-4'>
        <div className="flex space-x-1 rounded-3xl shadow-md">
          <div className='flex bg-gradient-to-r from-blue rounded-l-3xl to-green w-[65%] h-[55vh] bg-red-500 place-items-end pl-5 pb-4'>
            <h1 className='text-white text-4xl font-railway'>{data.data.data.title} </h1>
          </div>

          <div className='h-[55vh] '>
            {/* <img className="object-fill w-[100%] h-[100%] rounded-r-3xl" src={data.data.data.bannerImg} alt={data.data.data.banner}></img> */}
            <Image
              rootClassName="h-full w-full"
              style={{ objectFit: 'cover', height: '100%' }}
              src={data.data.data.bannerImg}
            />
          </div>

        </div>
        <div className='flex '>
          <div className='flex flex-1 flex-col space-y-2'>
            <h1 className="text-black text-xl font-railway">Work with {data.data.data.brand?.name}</h1>
            <div>
              <p className='text-lg text-grey font-railway font-thin'>
                {data.data.data.description}
              </p>
              <div className='flex flex-col'>

                <h1 className='text-xl text-black font-railway'>Required Platforms</h1>
                <div className='flex w-[70%] flex-wrap space-x-1 pt-2'>

                  {data?.data?.data?.platform.map(items => {
                    return <Detail text={items}></Detail>
                  })}
                </div>
              </div>


            </div>
            <div className='flex  flex-col md:w-[40%] md:flex-row md:justify-between '>
              <div className='space-y-2'>
                <h1 className='text-xl text-black font-railway'>
                  Due By
                </h1>
                <Detail text={data.data.data.deliveryDate} />
              </div>
              <div className='space-y-2'>
                <h1 className='text-xl text-black font-railway'>
                  Compensation
                </h1>
                <Detail text="Cash" />
              </div>



            </div>
            <div className='flex flex-col md:w-[60%] space-y-2'>
              <h1 className='text-xl text-black font-railway'>Information Requests</h1>
              <p className='text-base text-grey font-semibold'>Additional information lets brand know if you are a best fit for the campaign</p>
              <div className='flex flex-col items-start space-y-3 p-6 border rounded-3xl shadow-md'>
                {data?.data?.data?.questions.map((items, i) => {
                  return (<CampaignQuestions text={items} i={i}></CampaignQuestions>)
                })}
              </div>
            </div>
          </div>

          {user?.role === "brand" ? <div className="flex flex-[0.1] w-[30%]">

            <div className="dropdown dropdown-bottom dropdown-end relative bg-cyan-100 h-[10%] w-full">
              <label tabIndex={0} className="btn m-1 bg-blue">Invite Influencer</label>
              <ul tabIndex={0} className=" dropdown-content absolute menu p-2 shadow bg-base-100 rounded-box w-[400px]">
                {inviteInfluencer?.data?.data?.map(item => {
                  return <li>
                    <div className="flex justify-between px-2 py-1 mb-2 border">
                      <div className="flex space-x-2">
                        <img className='w-[50px] h-[50px] rounded-full shadow-sm' src={item?.photo} alt=""></img>
                        <h1>{item?.name}</h1>

                      </div>
                      <div>
                        <button onClick={
                          () => {
                            const val = {
                              campaignId: data?.data?.data["_id"],
                              to: item["_id"],
                              sender: data?.data?.data?.brand["_id"],
                            }
                            console.log(val)
                            mutate(val)
                          }
                        } className="px-1 py-1 rounded-full bg-green text-white text-sm">invite</button>
                      </div>
                    </div>
                  </li>
                })}

              </ul>
            </div>

          </div> :

            <div className='hidden md:flex flex-[0.1]    mr-2'>
              <div className='flex flex-col items-center  px-4 py-6 w-[300px] h-[160px] border shadow rounded-lg space-y-3'>
                <p className='text-grey text-base text-center '>If this campaign interests you then submit a bid to collaborate</p>
                <button onClick={() => handleOpen()} className='bg-blue text-center text-white font-railway py-2 px-3 rounded-full shadow hover:bg-indigo-600'>I'd like to submit a pitch</button>
              </div>
            </div>}

        </div>
        <button onClick={() => handleOpen()} className='bg-blue text-center text-white font-railway py-2 px-3 rounded-full shadow hover:bg-indigo-600 md:hidden'> Submit a Bid</button>

        {close && <InfluencerBidsDetailModal handleClose={handleBidClose} id={id} ></InfluencerBidsDetailModal>}
        <div className='flex flex-col md:flex-row space-x-1 '>
          {user?.role === "brand" ? <div className='flex flex-col  flex-1 item-center border bg-slate-100 p-10'>
            <div className='my-4'>
              <h1 className="text-3xl text-gray-800 font-railway ">Bids</h1>
              <p className='text-xl text-gray-500'>The bids place by the influencers are show here</p>
            </div>
            <div className='py-10 bg-white flex justify-center'>

              <BidsTable rows={bidsdata} columns={columns} onOpen={handleBidOpen}></BidsTable>
            </div>
          </div> :
            null}



          {user?.role === "brand" ? <div className='flex flex-row  md:flex-col border flex-[0.5] py-5 px-5 shadow-inner'>
            <h1 className="text-gray-800 text-xl font-railway">Accepted Invites</h1>
            <div className="h-full overflow-y-auto px-5 space-y-2 py-5 bg-white border">
              {acceptedBids?.data?.data?.map(item => {

                return (<CampaignAcceptedList
                  name={item?.sender?.name}
                  avatar={item?.sender?.photo}
                  influencerId={item?.sender["_id"]}
                  brandId={item?.to}
                  id={item["_id"]}
                  onOpen={handleOpenContract}
                ></CampaignAcceptedList>)
              })}

            </div>

            {contract && <ContractModel id={bidId} handleClose={handleCloseContract} />}

          </div> : null}

        </div>

      </div>



    </div>
  )
}

export default CampaignDetailInfluencer