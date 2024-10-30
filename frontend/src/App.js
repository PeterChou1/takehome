import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { Outlet, useNavigate, navigate } from "react-router-dom";


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function App() {
  const navigate = useNavigate();
  const goHome = () => {
      navigate(`/`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
      <Toolbar>
      <Button onClick={goHome} color="inherit">
      <Typography variant="h6" component="div">
          Issues
      </Typography>
      </Button>
      </Toolbar>
      </AppBar>
      <Outlet/>
    </Box>
  );
}


export default App;
