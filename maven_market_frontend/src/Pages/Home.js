import React, {useState} from 'react'
import GettingStartedButton from '../Components/GettingStartedButton'
import Navbar from '../Components/Navbar'
import SignupModal from '../Components/SignupModal';
import img from "../images/Marketing-cuate.png"
import { useNavigate } from 'react-router-dom';
const Home = () => {
  
  const [openSignupModal, setOpenSignup] = useState(false);
  const handleClose = ()=> setOpenSignup(false)
  const navigate = useNavigate();
  return (
    <>
    
    
    <Navbar></Navbar>
    {/* section 1 */}
    <section className='container mx-auto'>
        <div className='flex flex-col-reverse items-center justify-between px-10 pt-10 mx-auto space-x-2 space-y-0 md:flex-row '>
            <div className='flex flex-col justify-start mb-10 space-y-8 sm:justify-start '>
              <div className= "flex flex-col space-y-1">
                <h1 className='text-xs font-bold text-blue font-Andika'> A trusted influencer Marketing<br/> platform</h1>
                <h1 className='text-4xl font-extrabold sm:text-3xl'><span className="text-green">Influencer Marketing </span><br/>Platform That<br/> You Want</h1>
                
              </div>
              <p className= 'text-xs text-grey font-Andika' >Providing best plateform for brands <br/>to promote their brand and for <br/>content creators to earn online through<br/>Influencer Marketing</p>
              <div>
              <button onClick={()=>setOpenSignup(true)
              } className='px-3 pt-2 font-bold text-center text-white rounded-full drop-shadow-md md:p-3 bg-blue baseline hover:bg-grey drop-shadow-xl'>Get Started</button>

            </div>
            
            </div>
            <img className="sm:max-h-[250px]  md:max-h-[450px] " src={img} alt={img}></img>
     
        </div>
    </section>

    
    <SignupModal visible={openSignupModal} onClose= {handleClose}></SignupModal>
    </>
  )
}

export default Home