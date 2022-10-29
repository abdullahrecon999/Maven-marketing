import React, {useState} from 'react'
import DropdownMenu from './DropdownMenu';
import GettingStartedButton from './GettingStartedButton'


const Navbar = () => {

  const [open, setOpen] = useState(false);
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
            <GettingStartedButton></GettingStartedButton>
            <a className='p-3 text-grey baseline font-railway hover:text-blue'> or signin</a>
            
           

        </div>
        <button onClick={()=>{
            setOpen(!open)
        }} className='md:hidden'>menu</button>
        
        
    </div>
    {open && <DropdownMenu></DropdownMenu>}
    
   </nav>
  )
}

export default Navbar