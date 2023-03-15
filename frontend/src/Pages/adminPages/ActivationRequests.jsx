import React,{useState, useEffect, useRef} from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import NestedList from '../../Components/AdminDashboardList'

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
import Users from '../../Components/admindasboardcompents/Chart';
import UsersTable from '../../Components/admindasboardcompents/UsersTable';
import axios from 'axios'
import Loader from '../../Components/InfluencerComponents/Loader';

const getData = async () => {
    
  return await await axios.get("http://localhost:3000/brand/all", { withCredentials: true })
  .then(res => {
    console.log("Data: ",res.data); 
    return res.data.data.users
  }).catch(err => {
    console.log(err);
  })
}

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  return isMounted;
}

function preventDefault(event) {
  event.preventDefault();
}

const BrandUsers = () => {
  const [text, setText] = useState("")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const isMountedRef = useIsMounted();
  useEffect(() => {
    // load data from db
    async function get(){
      let resp = await getData()
      if (isMountedRef.current){
        setData(resp)
      }
    }
    get()
    
  }, [isMountedRef])

  useEffect(() => {
    console.log("get all influencers")
    const fetchUserAuth = async () => {
      console.log("Inside here")
      setLoading(true)
      await axios.get("http://localhost:3000/admin/getInactiveProfiles", { withCredentials: true })
      .then(res => {
        console.log("Data: ",res.data); 
        setData(res.data.data.users)
        setLoading(false)
      }).catch(err => {
        console.log(err);
      })
    }
    fetchUserAuth()
  }, [])

  return (
    <div>
      <AdminNavbar ></AdminNavbar>
     
        <div className='flex border shadow-inner'>
          <div className='bg-blue flex   duration-100md:w-[300px] md:h-[100vh] px-4 '>
            
            <NestedList></NestedList>
          </div>
            <div className='flex flex-col px-14 pt-7  '>
              <div className=''>
                 <h1 className='font-railway text-blue text-base'>Influencer Profile Activation Requests</h1>
                 <p className='text-xl font-railway pr-3 text-grey'>list of all activation requests below</p>
                 <div  className='w-[900px] h-[80vh] border shadow-2xl'>
                 {loading? <Loader title="fetching the user list"></Loader>:(data != undefined)? ((data[0] !== undefined)? (
                    <Users  data={data} ></Users>
                  ) : (<p>{console.log('waiting')}</p>)):(<p>{console.log('waitkjs')}</p>)}
                 {/* {(data != undefined)? ((data[0] !== undefined)? (
                    <UsersTable data={data} type = "brand"></UsersTable>
                  ) : (<p>{console.log('waiting')}</p>)):(<p>{console.log('waitkjs')}</p>)} */}
                 </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default BrandUsers
