import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AdminNavbar from '../Components/AdminNavbar';
import axios from 'axios';
import { AuthContext } from '../utils/authProvider';
import Loader from '../Components/InfluencerComponents/Loader';
import { TailSpin } from 'react-loader-spinner'
const AdminLogin = () => {
    const {user, setUser} = useContext(AuthContext)
    const {loading} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const [state, setState] = useState({
        email: "",
        password:""
    });

    const [err, setErr] = useState(false);
    
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }

    const login = () => {
        // send email and password as body of axios with post request
        state.role = "admin"
        setIsLoading(true)
        axios.post("http://localhost:3000/admin/login", state, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
        .then(res => {
            console.log(res.data.success)
            if(res.data.success === true){
                setUser(res.data.user)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                setIsLoading(false)
                navigate("/admin/home")
            }
            else{
                setErr(true)
            }
        })
        .catch(err => {
            setIsLoading(false)
            setErr(true)
        })
    }

    // check if user is logged in or not then redirects to home 

  return (
    <>
    <AdminNavbar></AdminNavbar>

    {err && <Alert severity="error" onClose={() => { setErr(false) }}>
        Credentials are incorrect
    </Alert>}
        {loading ? (<CircularProgress />) : (user? (
            <button onClick={()=> navigate("/admin/home")} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'>Dashboard</button>
        ):(
            <section className='flex justify-center items-center p-20'>
                <div className='flex flex-col space-y-4 items-center border border-grey py-7 px-3 rounded-lg drop-shadow-sm'>
                    <h1>Admin Login</h1>
                    <div className='flex flex-col space-y-4'>
                        {err && <p className= "text-xs text-red-700">Invalid credentails</p>}
                        <TextField onChange={handleChange}  name='email' size='small' id="outlined-basic" label="Email" variant="outlined" />
                        <TextField onChange={handleChange} type="password" name="password" size='small' id="outlined-basic" label="Password" variant="outlined" />
                    </div>
                    <div>
                        <Button className='bg-blue' onClick={login} variant="contained">{isLoading?<TailSpin
                                height="20"
                                width="20"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                />: "Log in"}</Button>
                    </div>
                </div>
            </section>
        ))}
    </>
    
  )
}

export default AdminLogin