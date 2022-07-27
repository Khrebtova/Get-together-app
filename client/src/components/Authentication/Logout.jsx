import React , {useContext, useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../context/user'
import { Box, Button, Typography, Divider } from '@mui/material'

const Logout = ({onSetSelectedEvent}) => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        onSetSelectedEvent(null)
    } , [onSetSelectedEvent])
    
    const handleLogout = () => {        
        fetch('/logout', {
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
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, mt: 10, ml: 20, mr: 20}}>
            <Typography variant="h3" mb={2} mt={2} >
                Loging out, {user.username} ?
            </Typography>
            <Divider />
            <Button  color="success" variant="outlined" size='large' sx={{mt: 4, mb: 4}}  onClick={handleLogout}>YES! Log out</Button>
            <Button  color='error' variant='outlined' size='large' onClick={() => navigate('/')}>NO! Stay logged in</Button>
        </Box>
    )
}

export default Logout