import React, { useContext, useEffect} from 'react'
import {UserContext} from '../context/user'

const Home = ({onSetSelectedEvent}) => {
  const {user} = useContext(UserContext)
  
  useEffect(() => {
    onSetSelectedEvent(null)
  } , [])

  return (
    <div>
      {user? <h1>Welcome to 'Get Together', {user.username}!</h1> : <h1>Welcome to 'Get Together', please Login</h1>}
    </div>
  )
}

export default Home