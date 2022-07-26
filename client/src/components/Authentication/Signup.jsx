import React , { useState, useContext }from 'react'
import { useNavigate } from 'react-router-dom'
import { headers } from '../../Globals'
import {UserContext} from '../context/user'
import { Box, TextField, Button, FormControl, Typography, Divider } from '@mui/material'

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
  console.log("newUser", newUser)
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
      
      fetch("/signup", {
        method: "POST",
        headers,
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
          password_confirmation: newUser.passwordConfirmation
        }),
      }).then((r) => { 
        setIsLoading(false);          
        if (r.ok) {
          r.json().then((user) => {
            console.log("account created")
            navigate('/')
            setNewUser(defaultData)
            setUser(user)
          });
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }
  
  if (user) return <h2>You already logged in {user.username}!</h2>

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, mt: 10, ml: 20, mr: 20}}>
      <Typography variant="h3" mb={2} mt={2} >
        Create New Account: 
      </Typography>
      <Divider />

      <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2 }}>                
        <TextField variant='outlined' name='username' onChange={handleChange} placeholder="Username"/>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2 }}>
        <TextField variant='outlined' type='password' name='password'  onChange={handleChange} placeholder="Password" />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2 }}>
        <TextField variant='outlined' type='password' name='passwordConfirmation' onChange={handleChange} placeholder="Confirm password" />      
      </FormControl>
      {errors.map((err, i) => <Typography key={i} variant="body1" mb={2} mt={2} color="error" >{err}</Typography>)}
      <FormControl sx={{ minWidth: 100, mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}> {isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormControl>
      <Divider />
      <Typography variant="body1" mb={2} mt={2}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Box>
  )
}

export default Signup