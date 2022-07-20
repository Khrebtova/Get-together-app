import React, { useContext} from 'react'
import Event from '../elements/Event'
import {UserContext} from '../context/user'

const MyEvents = ({events, onUpdateEvents}) => {
  const {user} = useContext(UserContext)
  console.log(events)
  const hostingEvents = events.filter(event => event.host.id === user.id)
  const attendingEvents = events.filter(event => event.guests.map(guest=>guest.id).includes(user.id))

  const listEventsHosting = hostingEvents.map(event => <Event key={event.id} event={event} user={user} onUpdateEvents={onUpdateEvents}/>)
  const listEventsAttending = attendingEvents.map(event => <Event key={event.id} event={event} user={user} onUpdateEvents={onUpdateEvents}/>)
  
  return (
    <div>
        {user? <h2>{user.username} here is your events</h2> : <h2>Please Login to see your events</h2>}
        <div>
          <h3>Hosting</h3>
          {listEventsHosting}
        </div>
        <div>
          <h3>Attending</h3>
          {listEventsAttending}
        </div>
    </div>
  )
}

export default MyEvents