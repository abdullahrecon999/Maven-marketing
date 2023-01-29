import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = blue[500]; // #f44336

export default function ErrorLogin() {

    const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        403
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        You are not Logged in
      </Typography>
      <div>
        <Button onClick={() => {navigate('/adminLogin')}} variant="contained">Admin Login</Button>
        <Button onClick={() => {navigate('/influencerlogin')}} variant="contained">Influencer Login</Button>
        <Button onClick={() => {navigate('/businesslogin')}} variant="contained">Business Login</Button>
        <Button onClick={() => {navigate('/')}} variant="contained">Home</Button>
      </div>
    </Box>
  );
}