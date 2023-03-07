import React,{useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../utils/authProvider";
import LineHeader from '../Components/InfluencerComponents/LineHeader';
import InfluencerTabs from "../Components/InfluencerComponents/InfluencerTabs"
const InfluencerHome = () => {
  const {user,setUser} = useContext(AuthContext);
  const verified = 0;
  const navigate = useNavigate();

  useEffect(()=>{
    
    // const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    

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
    <div className="flex flex-col space-y-6">
      <LineHeader></LineHeader>
      <div className="flex flex-col flex-1 container mx-12 space-y-7 ">
        <h1 className="text-xl font-railway font text-black"> My Work</h1>
        <InfluencerTabs></InfluencerTabs>
      </div>
    </div>
  )
}

export default InfluencerHome