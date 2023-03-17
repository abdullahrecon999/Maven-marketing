import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';

const GoogleSignup = () => {
  return (
    <div className='flex px-4 py-3 space-x-4 border rounded-md drop-shadow-sm hover:drop-shadow-xl hover:-translate-y-1'>
        <GoogleIcon></GoogleIcon>
        <h1>Login with Google</h1>
    </div>
  )
}

export default GoogleSignup