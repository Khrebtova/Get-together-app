import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { headers } from '../../Globals'
import {UserContext} from '../context/user'
import { Box, TextField, Typography, Stack } from '@mui/material'
import IMG from '../../assets/sunset-square.jpg'
import { LoginButton, LoginForm, LoginBox} from '../Styles'

const Signup = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultData = {
      "username": '',
      "password": '',
      "passwordConfirmation": ''        
  }
  const [newUser, setNewUser] = useState(defaultData)
  
  const handleChange = (e) => {
      let key = e.target.name
      let value = e.target.value
      let formData = {...newUser, [key]: value}        
      setNewUser(formData)
  }

  function handleSubmit(e) {
      e.preventDefault();
      setErrors([]);
      setIsLoading(true);      
      
      fetch("/api/signup", {
        method: "POST",
        headers,
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
          password_confirmation: newUser.passwordConfirmation
        }),
      }).then((r) => {                
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)            
            setIsLoading(false);  
            navigate('/')            
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }
  
  if (user) return <Typography variant="h3" m={15}>You are already logged in </Typography>

  return (
    <Stack sx={{flexDirection: {sm: 'column', lg: 'row', md: 'row'}}} className='authentication-page' mt='120px'>
      <LoginBox >
        <Typography variant="h5" mb={2} mt={2} >
          Create New Account: 
        </Typography>
        
        <LoginForm >                
          <TextField variant='outlined' color='success' name='username' onChange={handleChange} placeholder="Username"/>
        </LoginForm>
        <LoginForm >
          <TextField variant='outlined' color="success" type='password' name='password'  onChange={handleChange} placeholder="Password" />
        </LoginForm>
        <LoginForm >
          <TextField variant='outlined' color="success" type='password' name='passwordConfirmation' onChange={handleChange} placeholder="Confirm password" />      
        </LoginForm>
        {errors.map((err, i) => <Typography key={i} variant="body1" mb={2} mt={2} color="error" >{err}</Typography>)}
        <LoginForm >
          <LoginButton variant="contained" onClick={handleSubmit}> {isLoading ? "Loading..." : "Sign Up"}</LoginButton>
        </LoginForm>
        
        <Typography variant="body1" mb={2} mt={2}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </LoginBox>
      <Box p='0 30px' className='login-img'>
        <img src={IMG} alt="high-five"  />
        <p className='img-label'>Photo by <a href="https://unsplash.com/@nixcreative?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tyler Nix</a> on <a href="https://unsplash.com/s/photos/friends?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>            
      </Box>
    </Stack>
  )
}

export default Signup