import React, {useState} from 'react'
import DropdownMenu from './DropdownMenu';
import GettingStartedButton from './GettingStartedButton'
import MenuIcon from '@mui/icons-material/Menu';
import SignupModal from './SignupModal';
import LoginModal from './LoginModalInfluencer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Input } from '@mui/icons-material';
import LoginModalBrand from './LoginModalInfluencer';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [openSignupModal, setOpenSignup] = useState(false);
    const [openloginModal, setOpenlogin] = useState(false)
    const [openbrandLogin, SetBrandLogin] = useState(false)
    const [open, setOpen] = useState(false);


    const handleClose = ()=> setOpenSignup(false)
    const handleCloseLogin = ()=> setOpenlogin(false)
    
    const handleCloseLoginBrand = ()=> SetBrandLogin(false)

    
  return (
    <>
   <nav className='container relative px-2 py-6 mx-auto'>
    <div className='flex items-center justify-between'>
        <h1 className='text-black font-railway'>Maven Marketing</h1>
        <div className='hidden space-x-6 md:flex'>
            <Link to="/services" className='text-grey font-railway hover:text-blue'>Services</Link>
            <Link to="/aboutus" className='text-grey font-railway hover:text-blue'>about us</Link>
            <Link to="/whyus" className='text-grey font-railway hover:text-blue'>why us?</Link>
        </div>
        <div className='hidden space-x-0.5 md:flex'>
            <button onClick={()=>setOpenSignup(true)} className='px-3 pt-2 font-bold text-center text-white rounded-full drop-shadow-md md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Get Started</button>
            <button onClick={()=> setOpenlogin(true)} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'> Influencer login</button>
            <button onClick={()=> setOpenlogin(true)} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'> Brand login</button>
                   
        
        </div>
        <button onClick={()=>{
            setOpen(!open)
        }} className='text-grey md:hidden'><MenuIcon></MenuIcon></button>
        
        
    </div>
    {open && <DropdownMenu></DropdownMenu>}
    
    
    

   </nav>
   <SignupModal visible={openSignupModal} onClose= {handleClose}></SignupModal>
   <LoginModal visible={openloginModal} onClose={handleCloseLogin}></LoginModal>
   <LoginModalBrand visible={openbrandLogin}  onClose= {handleCloseLoginBrand}></LoginModalBrand>
   
   </>
  )
}

export default Navbar