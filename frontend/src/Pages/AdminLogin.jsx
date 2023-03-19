import React, { useState, useContext, useEffect } from 'react'
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
import { Modal, notification } from 'antd';
import { useQuery } from 'react-query';

const AdminLogin = () => {

	const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, desc) => {
    api[type]({
      message: msg,
      description:
        desc,
    });
  };

	const { user, setUser } = useContext(AuthContext)
	const { loading } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [token, setToken] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
		setToken('')
		setNewPassword('')
  };

	const navigate = useNavigate()
	const [state, setState] = useState({
		email: "",
		password: ""
	});

	const [err, setErr] = useState(false);

	function handleChange(evt) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value
		});
	}

	const onEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const onTokenChange = (e) => {
		setToken(e.target.value)
	}

	const onNewPasswordChange = (e) => {
		setNewPassword(e.target.value)
	}

	const resetPass = () => {
		axios.post("http://localhost:3000/admin/password-reset", {email: email}, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})
			.then(res => {
				console.log(res.data)
				openNotificationWithIcon('success', 'Token Sent', 'Password reset token sent to your email')
			})
			.catch(err => {
				console.log(err)
				openNotificationWithIcon('error', 'Token not Sent', 'Password reset token not sent')
			})
	}

	const newPass = () => {
		axios.post("http://localhost:3000/admin/resetPassword/"+token, {password: newPassword}, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})
			.then(res => {
				console.log(res.data)
				openNotificationWithIcon('success', 'Password Reset', 'Password reset successfully')
				setIsModalOpen(false);
			})
			.catch(err => {
				console.log(err)
				openNotificationWithIcon('error', 'Password Reset', 'Password reset failed')
			})
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
				if (res.data.success === true) {
					setUser(res.data.user)
					localStorage.setItem('user', JSON.stringify(res.data.user))
					setIsLoading(false)
					navigate("/admin/home")
				}
				else {
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
			{contextHolder}
			<AdminNavbar></AdminNavbar>
			<Modal 
				title="Reset Password" 
				open={isModalOpen} 
				onCancel={handleCancel}
				footer={[
					<div className='flex gap-2 justify-end'>
						<button className="btn btn-info btn-outline btn-sm" onClick={handleCancel}>cancel</button>
						<button className="btn btn-info btn-sm" onClick={()=>resetPass()}>Send Token</button>
					</div>
        ]}
			>
				<div className='flex flex-col gap-2'>
					<div className='flex-col flex gap-1'>
						<label htmlFor="email">Email</label>
						<input onChange={onEmailChange} placeholder='Enter email' type="email" name="email" id="email" className='bg-white border border-grey p-2 rounded-md' />
					</div>
					<div className='flex-col flex gap-1'>
						<label htmlFor="token">Token From Email</label>
						<input onChange={onTokenChange} placeholder='Enter token' name="token" className='bg-white border border-grey p-2 rounded-md' />
					</div>
					<div className='flex-col flex gap-1'>
						<label htmlFor="pass">New Password</label>
						<input onChange={onNewPasswordChange} placeholder='Enter new password' type="password" name="pass" className='bg-white border border-grey p-2 rounded-md' />
					</div>
					<button onClick={() => newPass()} className='btn btn-sm btn-secondary' >Reset Pass</button>
				</div>
				
      </Modal>
			{err && <Alert severity="error" onClose={() => { setErr(false) }}>
				Credentials are incorrect
			</Alert>}
			{loading ? (<CircularProgress />) : (user ? (
				<button onClick={() => navigate("/admin/home")} className='p-3 text-grey baseline font-railway text-sm hover:text-blue'>Dashboard</button>
			) : (
				<section className='flex justify-center items-center p-20'>
					<div className='flex flex-col space-y-4 items-center border border-grey py-7 px-3 rounded-lg drop-shadow-sm'>
						<h1>Admin Login</h1>
						<div className='flex flex-col space-y-4'>
							{err && <p className="text-xs text-red-700">Invalid credentails</p>}
							<TextField onChange={handleChange} name='email' size='small' id="outlined-basic" label="Email" variant="outlined" />
							<TextField onChange={handleChange} type="password" name="password" size='small' id="outlined-basic" label="Password" variant="outlined" />
						</div>
						<a className="link link-hover" onClick={showModal}>Reset Password</a>
						<div>
							<Button className='bg-blue' onClick={login} variant="contained">{isLoading ? <TailSpin
								height="20"
								width="20"
								color="white"
								ariaLabel="tail-spin-loading"
								radius="1"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
							/> : "Log in"}</Button>
						</div>
					</div>
				</section>
			))}
		</>

	)
}

export default AdminLogin