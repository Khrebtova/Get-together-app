import React, { useContext} from 'react'
import Event from '../elements/Event'
import {UserContext} from '../context/user'

const MyEvents = () => {
  const {user} = useContext(UserContext)
  const eventsHosting = user.hosting_events.map(event => <Event key={event.id} event={event} />)
  const eventsAttending = user.attending_events.map(event => <Event key={event.id} event={event} />)
  
  return (
    <div>
        {user? <h2>{user.username} here is your events</h2> : <h2>Please Login to see your events</h2>}
        <div>
          <h3>Hosting</h3>
          {eventsHosting}
        </div>
        <div>
          <h3>Attending</h3>
          {eventsAttending}
        </div>
    </div>
  )
}

export default MyEvents