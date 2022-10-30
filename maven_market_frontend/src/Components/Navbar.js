import React, {useState} from 'react'
import DropdownMenu from './DropdownMenu';
import GettingStartedButton from './GettingStartedButton'
import MenuIcon from '@mui/icons-material/Menu';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

const Navbar = () => {
    const [openSignupModal, setOpenSignup] = useState(false);
    const [openloginModal, setOpenlogin] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClose = ()=> setOpenSignup(false)
    const handleCloseLogin = ()=> setOpenlogin(false)
    
  return (
   <nav className='container relative px-2 py-6 mx-auto'>
    <div className='flex items-center justify-between'>
        <h1 className='text-black font-railway'>Maven Marketing</h1>
        <div className='hidden space-x-6 md:flex'>
            <a href='#' className='text-grey font-railway hover:text-blue'>Services</a>
            <a href='#' className='text-grey font-railway hover:text-blue'>about us</a>
            <a href='#' className='text-grey font-railway hover:text-blue'>why us?</a>
        </div>
        <div className='hidden space-x-5 md:flex'>
        <button onClick={()=>setOpenSignup(true)
              } className='px-3 pt-2 font-bold text-center text-white rounded-full drop-shadow-md md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Get Started</button>
            <button onClick={()=> setOpenlogin(true)} className='p-3 text-grey baseline font-railway hover:text-blue'> or signin</button>
            
           

        </div>
        <button onClick={()=>{
            setOpen(!open)
        }} className='text-grey md:hidden'><MenuIcon></MenuIcon></button>
        
        
    </div>
    {open && <DropdownMenu></DropdownMenu>}
    
    <SignupModal visible={openSignupModal} onClose= {handleClose}></SignupModal>
    <LoginModal visible={openloginModal} onClose={handleCloseLogin}></LoginModal>

   </nav>
  )
}

export default Navbar