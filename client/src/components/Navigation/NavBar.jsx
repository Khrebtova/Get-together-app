import React, { useContext } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {UserContext} from '../context/user'
import {AppBar, Typography, Button, Divider, MenuItem, Menu, Avatar, Tooltip, IconButton, Stack} from '@mui/material';
import Logo from '../../assets/logo-white.jpg'

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
              <Avatar sx={{ width: 42, height: 42, bgcolor: 'white', color: 'purple', fontFamily: 'monospace', fontWeight: 700}}>{letter}</Avatar>
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
            <MenuItem onClick={()=>{navigate('/my-events'); handleClose()}}>My Events</MenuItem>
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
      <AppBar position="fixed" sx={{background: '#6D9886', height: '120px'}}>
        <Stack direction="row" alignItems='center' p='20px' ml='40px' mr='40px'>       
          <img src={Logo} alt="logo" className='logo' style={{height: '80px', borderRadius: '20px'}} onClick={()=>navigate('/')}/>
          <Typography                         
            sx={{ flexGrow: 1, mr: 2, ml: 2,  fontSize: {lg: '40px', sm: '30px'}, fontWeight: 700, letterSpacing: '.3rem', color: 'inherit'}} 
            onClick={()=>navigate('/')}
          >
            GET TOGETHER
          </Typography>
        <Divider/>     
        {user ? loggedInLinks() : loggedOutLinks()} 
        </Stack>
      </AppBar>                
       
  )
}

export default Navbar