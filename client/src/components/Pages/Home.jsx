import React, { useContext} from 'react'
import {UserContext} from '../context/user'

const Home = () => {
  const {user} = useContext(UserContext)
  console.log(user);

  return (
    <div>
      {user? <h1>Welcome to 'Get Together', {user.username}!</h1> : <h1>Welcome to 'Get Together', please Login</h1>}
    </div>
  )
}

export default Home