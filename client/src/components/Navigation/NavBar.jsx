import React, { useContext } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {UserContext} from '../context/user'
import {AppBar, Typography, Button, Divider, MenuItem, Menu, Avatar, Tooltip, IconButton, Stack} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

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
        <Tooltip title="Browse Events" placement="bottom">       
          <Button color="inherit" size='small' onClick={()=>navigate('/events')}>
            <SearchIcon sx={{fontSize: {lg: '30px', md: '30px', sm: '20px'}}} /> 
          </Button>
        </Tooltip>
        <Tooltip title="Create Event" placement="bottom">
          <Button color="inherit" onClick={()=>navigate('/events/new')}>
            <AddCircleOutlineIcon sx={{fontSize: {lg: '30px', md: '30px', sm: '20px'}}}/> 
          </Button>
        </Tooltip>  
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
              <Avatar 
              sx={{ 
                width: {lg: 50, md: 40, sm: 30, xs: 30}, 
                height: {lg: 50, md: 40, sm: 30, xs: 30}, 
                bgcolor: '#F6F6F6', 
                color: '#212121', 
                fontWeight: 900}}
              >
                  {letter}
              </Avatar>
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
            fontSize='small'
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>{navigate('/my-events'); handleClose()}}>My Events</MenuItem>
            <MenuItem onClick={()=>{navigate('/events'); handleClose()}}>Browse Events</MenuItem>
            <MenuItem onClick={()=>{navigate('/events/new'); handleClose()}}>Create Event</MenuItem>
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
      <AppBar position="fixed" sx={{background: '#6D9886', height: '120px', p: {lg: '20px 40px', md: '40px', sm: '30px 40px', xs: '20px'}}}>
        <Stack direction='row' alignItems='center'  >           
          <Typography                         
            sx={{ 
            flexGrow: 1,
            fontSize: {lg: '40px', md: '40px', sm: '30px', xs: '20px'}, 
            fontWeight: 700, 
            letterSpacing: '.3rem', 
            color: 'inherit'
            }} 
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