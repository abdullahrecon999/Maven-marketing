import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';

import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SignUpPageBusiness from './Pages/SignUpPageBusiness';
import SignUpPageInfluencer from './Pages/SignUpPageInfluencer';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Services from './Pages/Services';
import Aboutus from './Pages/Aboutus';
import Whyus from './Pages/Whyus';
import Error from './Pages/errorPages/notFound';
import ErrorUnauthorized from './Pages/errorPages/unauthorized';
import RequireAuth from './Components/RequireAuth';

import AdminLogin from './Pages/AdminLogin';
import AdminHome from './Pages/AdminHome';
import AccountVerification from './Pages/AccountVerification';
import Profilecompletion from './Pages/Profilecompletion';
import Users from './Pages/adminPages/Users';
import BrandUsers from './Pages/adminPages/BrandUsers';
import BusinessHome from './Pages/brandPages/BusinessHome';
import BusinessLogin from './Pages/BusinessLogin';
import CampaginCreation from './Pages/brandPages/CampaginCreation';
import InfluencerLogin from './Pages/InfluencerLogin';
import InfluencerDetails from './Pages/InfluencerDetails';
import InfluencerHome from './Pages/InfluencerHome';
import PasswordReset from './Pages/passwordReset';
import NewCampaignPage from './Pages/brandPages/NewCampaign';
import Campaign from './Pages/brandPages/Campaign';
import CampaignDetail from './Pages/brandPages/CampaignDetail';
import { AuthContext } from './utils/authProvider';

function App() {

  const {loading} = useContext(AuthContext);

  return (
    <Router>
        <div className='app'>
        {loading? (<h1>loadig</h1>) : (
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home/>} ></Route>
            <Route path='/influencerlogin' element={<InfluencerLogin/>}></Route>
            <Route path='/businesslogin' element={<BusinessLogin/>}></Route>
            <Route path='/adminLogin' element={<AdminLogin/>}></Route>
            <Route path='/BusinessSignup' element={<SignUpPageBusiness/>} ></Route>
            <Route path='/InfluencerSignup' element={<SignUpPageInfluencer/>} ></Route>
            <Route path='/aboutus' element={<Aboutus/>} ></Route>
            <Route path='/services' element={<Services/>} ></Route>
            <Route path='/whyus' element={<Whyus/>} ></Route>

            {/* Admin Protected Routes */}
            <Route element={<RequireAuth allowedRoles={['admin']} />} >
              <Route path='/admin/home' element={<AdminHome/>}></Route>
              <Route path='/admin/home/influencer/:id' element={<InfluencerDetails/>}></Route>
              <Route path='/admin/users' element={<Users/>}></Route>
              <Route path='/admin/bUsers' element={<BrandUsers/>}></Route>
            </Route>

            {/* Brand Protected Routes */}
            <Route element={<RequireAuth allowedRoles={['brand']} />} >
              <Route path='/businesshome' element={<BusinessHome/>} ></Route>
              <Route path='/createCampaign' element={<NewCampaignPage/>} ></Route>
            </Route>

            <Route path='/campaigncreation' element={<CampaginCreation/>} ></Route>
            <Route path='/campaigns' element={<Campaign/>} ></Route>
            <Route path='/campaigns/:title' element={<CampaignDetail/>} ></Route>

            {/* Influencer Protected Routes */}
            <Route element={<RequireAuth allowedRoles={['influencer']} />} >
              <Route path='/influencerhome' element={<Profilecompletion />} ></Route>
            </Route>
            
            {/* Protected complementary Routes */}
            <Route path='/p' element={<Profilecompletion/>}></Route>
            <Route path='/verify' element={<AccountVerification/>}></Route>
            <Route path='/' element={<Profilecompletion/>}></Route> 
            {/* <Route path='/' element={<CampaginCreation/>} ></Route> */}
            <Route path="/unauthorized" element={<ErrorUnauthorized />} />

            <Route path='*' element={<Error/>}></Route>
          </Routes>
        )}
          
        </div>
    </Router>
  );
}

export default App;