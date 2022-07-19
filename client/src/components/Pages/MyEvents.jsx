import React from 'react'

const MyEvents = ({user}) => {
  return (
    <div>
        {user? <h2>{user.username} here is your events</h2> : <h2>Please Login to see your events</h2>}

    </div>
  )
}

export default MyEvents