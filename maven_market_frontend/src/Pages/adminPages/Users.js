import React, {useState, useEffect, useRef} from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import NestedList from '../../Components/AdminDashboardList'
import  Button from "@mui/material/Button"
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
import TextField  from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Height } from '@mui/icons-material';
import UsersTable from '../../Components/admindasboardcompents/UsersTable';
import axios from 'axios'

function preventDefault(event) {
  event.preventDefault();
}

const getData = async () => {
    
  return await await axios.get("http://localhost:3000/influencer/all", { withCredentials: true })
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

const Users = () => {
  const [text, setText] = useState("")
  const [data, setData] = useState(null)

  const handleClick =()=>{
    // use to fetch the results
    console.log(text)
  }
  
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
      await axios.get("http://localhost:3000/influencer/all", { withCredentials: true })
      .then(res => {
        console.log("Data: ",res.data); 
        setData(res.data.data.users)
      }).catch(err => {
        console.log(err);
      })
    }
    fetchUserAuth()
  }, [])

  return (
    <div>
      <AdminNavbar ></AdminNavbar>
     
        <div className='flex'>
          <div className='bg-blue flex  w-auto duration-100md:w-[300px] md:h-[100vh] px-4 '>
            
            <NestedList></NestedList>
          </div>
            <div className='flex flex-col items-center px-14 pt-7 '>
                <div className='flex  justify-center space-x-2 self-start'>
                    <TextField value={text} onChange={e => setText(e.target.value)}  sx={{width:300,"& .MuiInputBase-root":{height: 30}}}></TextField>
                <div>
                  <Button onClick={handleClick} className='bg-blue' variant="contained"><SearchIcon></SearchIcon></Button>
                </div>
                </div>
                <div className=' '>
                  <h1 className='font-railway text-blue text-base pr-3'>Influencers</h1>
                  <div className='w-[900px]'>
                  {/* {data ? (
                    <div className='flex justify-center items-center'>
                      <h1 className='font-railway text-blue text-base'>Loading...</h1>
                    </div>
                  ) : (
                    <UsersTable data={data} type = "influencer"></UsersTable>
                  )} */}

                  {(data != undefined)? ((data[0] !== undefined)? (
                    <UsersTable data={data} type = "influencer"></UsersTable>
                  ) : (<p>{console.log('waiting')}</p>)):(<p>{console.log('waitkjs')}</p>)}
                </div>
                      
              </div>
          </div>
        </div>
    </div>
  )
}

export default Users