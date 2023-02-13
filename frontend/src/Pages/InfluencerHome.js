import React,{useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../utils/authProvider";
import { Verified } from '@mui/icons-material';
import UnderReviewPage from './UnderReviewPage';

const InfluencerHome = () => {
  const {setUser} = useContext(AuthContext);
  const verified = 0;
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    

  })
  const logout = async () => {
    // do axios get to backend for logout
    // then redirect to home page
    await axios.get("http://localhost:3000/influencer/logout", { withCredentials: true }).then(res => {
      console.log(res)
      setUser(null)
      localStorage.removeItem('user')
      navigate("/")
    }).catch(err => {
      console.log(err)
    })
  }
 


  return (
    <>
      <div>InfluencerHome</div>
      <button onClick={() => {logout()}} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'>Logout</button>
    </>
  )
}

export default InfluencerHome