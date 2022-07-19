import React from 'react'

const Home = ({user}) => {
  return (
    <div>
      {user? <h1>Welcome {user.username}</h1> : <h1>Welcome to Get Together, please Login</h1>}
    </div>
  )
}

export default Home