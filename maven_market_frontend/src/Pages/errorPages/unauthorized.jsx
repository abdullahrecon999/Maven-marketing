import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = blue[500]; // #f44336

export default function ErrorUnauthorized() {

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
        401
      </Typography>
      <Typography variant="h3" style={{ color: 'white' }}>
        Unauthorized
      </Typography>
      <Button onClick={() => {navigate(-1)}} variant="contained">Back Home</Button>
    </Box>
  );
}