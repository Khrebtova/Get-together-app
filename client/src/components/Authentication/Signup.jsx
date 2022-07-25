import React , { useState, useContext }from 'react'
import { useNavigate } from 'react-router-dom'
import { headers } from '../../Globals'
import {UserContext} from '../context/user'

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
      let key = e.target.id
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
    <form onSubmit={handleSubmit}>
        <h2>Create new account</h2>
        <label htmlFor="username">Username</label>
        <input
        type="text"
        id="username"
        autoComplete="off"
        value={newUser.username}
        
        onChange={handleChange}
        />      
    
        <label htmlFor="password">Password</label>
        <input
        type="password"
        id="password"
        value={newUser.password}        
        onChange={handleChange}
        autoComplete="current-password"
        />
    
        <label htmlFor="password">Password Confirmation</label>
        <input
        type="password"
        id="passwordConfirmation"
        value={newUser.passwordConfirmation}
        onChange={handleChange}        
        autoComplete="current-password"
        />   
    
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>     
        <h3>Or login to your account</h3>
        <button onClick={()=>navigate('/login')}>Login</button>
        {errors ? errors.map((err) => (<p style={{color: 'red'}} key={err}>{err}</p>)) : null}
  
    </form>
  )
}

export default Signup