import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/user'

const Navbar = () => {
  const {user} = useContext(UserContext)

  const loggedInLinks = () => {
    return(
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/myevents">My Events</Link></li>
        <li><Link to='/events'>Browse all events</Link></li>
        <li><Link to='/events/new'>Crete new Event</Link></li>        
        <li><Link to="/logout">Logout</Link></li>
      </ul>  
    )
  }
  const loggedOutLinks = () => {
    return(
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>  
    )
  }
  return (
    <div>
        {user ? loggedInLinks() : loggedOutLinks()}                 
    </div>
  )
}

export default Navbar