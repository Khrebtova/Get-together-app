import React , {useContext, useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../context/user'
import { Box, Typography, Stack } from '@mui/material'
import IMG from '../../assets/hike-horisontal.jpg'
import { LoginButton, LoginBox, LogoutButton} from '../Styles'

const Logout = ({onSetSelectedEvent}) => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        onSetSelectedEvent(null)
    } , [onSetSelectedEvent])
    
    const handleLogout = () => {        
        fetch('/api/logout', {
            method: "DELETE"
        })
        .then(() => {            
            setUser(null)                
            navigate('/login')
            }
        )        
    }
    
    if (!user) return <h2>You are not logged in</h2>
    
    return (
        <Stack sx={{flexDirection: {sm: 'column', lg: 'row', md: 'column'}}} className='authentication-page' mt='120px'>
            <LoginBox >
                <Typography variant="h5" mb={2} mt={2} >
                    Bye Bye, {user.username} !
                </Typography>
                
                <LogoutButton variant="contained"  onClick={handleLogout}>Log out</LogoutButton>
                <LoginButton variant='contained' onClick={() => navigate('/')}>Stay logged in</LoginButton>
            </LoginBox>            
            <Box p='0 30px' className='login-img' >
                <img src={IMG} alt="hiking" />
                <p className='img-label'>Photo by <a href="https://unsplash.com/@hollymandarich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Holly Mandarich</a> on <a href="https://unsplash.com/s/photos/hike?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>            
            </Box>
        </Stack>
    )
}

export default Logout