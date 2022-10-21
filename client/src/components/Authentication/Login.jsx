import React , { useState, useContext } from 'react'
import {UserContext} from '../context/user'
import { useNavigate } from 'react-router-dom'
import { headers } from '../../Globals'
import { Box, TextField, Typography, Stack } from '@mui/material'
import IMG from '../../assets/ocean-square.jpg'
import { LoginButton, LoginForm, LoginBox } from './Styles'


const Login = () => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
        
    const handleSubmit = (e) => {
        e.preventDefault();        
        fetch("/api/login", {
            method: "POST",
            headers,
            body: JSON.stringify({ username, password }),
        })        
        .then((r) => {            
            if (r.ok) {
                r.json().then((user) => {                    
                    setUser(user)
                    navigate('/')                    
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    if (user) return <Typography variant="h4" m={15}>You're already logged in {user.username}!</Typography>
   
    return (
        <Stack sx={{flexDirection: {sm: 'column', lg: 'row', md: 'row'}}} className='authentication-page' mt='120px'>
            <LoginBox>
                <Typography variant="h5" mb={2} mt={2} >
                    Login:
                </Typography>                
                <LoginForm  >                
                    <TextField variant='outlined' color="success" name='username' onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="off" value={username}/>
                </LoginForm>
                <LoginForm  >
                    <TextField variant='outlined' color="success" type='password' name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="off" value={password}/>
                </LoginForm>
                {errors.map((err, i) => <Typography key={i} variant="body1" mb={2} mt={2} color="error" >{err}</Typography>)}
                <LoginForm >
                    <LoginButton  onClick={handleSubmit}> Login </LoginButton>
                </LoginForm>            
                <Typography variant="body1" mb={2} mt={2}>
                    Don't have an account? <a href="/signup">Signup</a>
                </Typography>
            </LoginBox>            
            <Box p='0 30px' className='login-img'>
                <img src={IMG} alt="high-five" />
                <p className='img-label'>Photo by <a href="https://unsplash.com/@von_co?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ivana Cajina</a> on <a href="https://unsplash.com/s/photos/friends?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>            
            </Box>
        </Stack>
  )
    
}

export default Login