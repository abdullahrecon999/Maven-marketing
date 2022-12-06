import logo from './logo.svg';
import './App.css';

import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import SignUpPageBusiness from './Pages/SignUpPageBusiness';
import SignUpPageInfluencer from './Pages/SignUpPageInfluencer';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Services from './Pages/Services';
import Aboutus from './Pages/Aboutus';
import Whyus from './Pages/Whyus';

import AdminLogin from './Pages/AdminLogin';
import AdminHome from './Pages/AdminHome';
import AccountVerification from './Pages/AccountVerification';
import Profilecompletion from './Pages/Profilecompletion';
import Users from './Pages/adminPages/Users';
import BrandUsers from './Pages/adminPages/BrandUsers';
import BusinessHome from './Pages/brandPages/BusinessHome';
import CampaginCreation from './Pages/brandPages/CampaginCreation';
import InfluencerLogin from './Pages/InfluencerLogin';
import InfluencerDetails from './Pages/InfluencerDetails';

function App() {
  return (
    <Router>
        <div className='app'>
          <Routes>
            <Route path='/' element={<Home/>} ></Route> 
            <Route path='/influencerlogin' element={<InfluencerLogin/>}></Route>
            <Route path='/admin/home' element={<AdminHome/>}></Route>
            <Route path='/admin/home/influencer/:id' element={<InfluencerDetails/>}></Route>
            <Route path='/admin/users' element={<Users/>}></Route>
            <Route path='/admin/bUsers' element={<BrandUsers/>}></Route>
            <Route path='/p' element={<Profilecompletion/>}></Route> 
            {/* <Route path='/BusinessSignup' element={<SignUpPageBusiness/>} ></Route>
            <Route path='/InfluencerSignup' element={<SignUpPageInfluencer/>} ></Route>
            <Route path='/aboutus' element={<Aboutus/>} ></Route>
            <Route path='/services' element={<Services/>} ></Route>
            <Route path='/whyus' element={<Whyus/>} ></Route>
            <Route path='/businesshome' element={<BusinessHome/>} ></Route>
            <Route path='/influencerhome' element={<Whyus/>} ></Route>
            <Route path='/admin' element={<AdminLogin/>}></Route>
            <Route path='/admin/home' element={<AdminHome/>}></Route>
            <Route path='/verify' element={<AccountVerification/>}></Route>
            <Route path='/admin/users' element={<Users/>}></Route>
            <Route path='/' element={<Profilecompletion/>}></Route> */}
           {/* <Route path='/' element={<CampaginCreation/>} ></Route> */}
          </Routes>
        </div>
    </Router>
    // <div className="app">
    //   {/* <SignUpPageBusiness></SignUpPageBusiness> */}
    //   {/* <SignUpPageInfluencer></SignUpPageInfluencer> */}
    //   <Home></Home>
    // </div>
  );
}

export default App;
