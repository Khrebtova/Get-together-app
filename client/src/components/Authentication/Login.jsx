import React , { useState, useContext } from 'react'
import {UserContext} from '../context/user'
import { useNavigate } from 'react-router-dom'
import { headers } from '../../Globals'
import { Box, TextField, Button, FormControl, Typography, Divider } from '@mui/material'

const Login = () => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
        
    const handleSubmit = (e) => {
        e.preventDefault();        
        fetch("/login", {
            method: "POST",
            headers,
            body: JSON.stringify({ username, password }),
          }).then((r) => {            
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

    if (user) return <h2>You already logged in {user.username}!</h2>
   
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, mt: 10, ml: 20, mr: 20}}>
        <Typography variant="h3" mb={2} mt={2} >
            Login:
        </Typography>
        <Divider />
        <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2 }}>                
            <TextField variant='outlined' name='username' onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="off" value={username}/>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2 }}>
            <TextField variant='outlined' type='password' name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="off" value={password}/>
        </FormControl>
        {errors.map((err, i) => <Typography key={i} variant="body1" mb={2} mt={2} color="error" >{err}</Typography>)}
        <FormControl sx={{ minWidth: 100, mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}> Login </Button>
        </FormControl>
        {/* <div>            
            <form onSubmit={handleSubmit}>                
                <input type="text" id="username" placeholder="username"  autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" id="password" placeholder="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {errors? errors.map(error => <p style={{color: 'red'}} key={error}>{error}</p>) : null}
            </form>
           
        </div> */}
            <Typography variant="body1" mb={2} mt={2}>
                Don't have an account? <a href="/signup">Signup</a>
            </Typography>
        </Box>
  )
    
}

export default Login