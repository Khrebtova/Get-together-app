import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../context/user'
// Material UI Components: 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loggedInLinks = () => {
    const letter = user.username.slice(0,1).toUpperCase()
   
    return(
      <>        
        <Button color="inherit" onClick={()=>navigate('/events')}>Browse all events</Button>
        <Button color="inherit" onClick={()=>navigate('/events/new')}>Create new Event</Button>        
        {/* <Button color="inherit" onClick={()=>navigate('/myevents')}>My Events</Button> */}
        {/* <Button color="inherit" onClick={()=>navigate('/logout')}>Logout</Button> */}
        <div>
          <Tooltip title="menu">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32}}>{letter}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>{navigate('/myevents'); handleClose()}}>My Events</MenuItem>
            <MenuItem onClick={()=> {navigate('/logout'); handleClose()}}>Logout</MenuItem>
          </Menu>
        </div>
      </>  
    )
  }
  const loggedOutLinks = () => {
    return(
      <>        
        <Button color="inherit" onClick={()=>navigate('/login')}>Login</Button>
        <Button color="inherit" onClick={()=>navigate('/signup')}>Signup</Button>
      </>  
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>       
          <Typography 
            variant="h6" component="div" 
            sx={{ flexGrow: 1, mr: 2, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'}} 
            onClick={()=>navigate('/')}
          >
            LET'S GET TOGETHER
          </Typography>
        <Divider />     
        {user ? loggedInLinks() : loggedOutLinks()} 
        </Toolbar>
      </AppBar>                
    </Box>
  )
}

export default Navbar