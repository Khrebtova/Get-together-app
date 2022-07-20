import React, { useEffect, useState, useContext} from 'react'
import {UserContext} from '../context/user'
import Event from '../elements/Event'

const EventBrowser = () => {
  const {user} = useContext(UserContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('/events')
    .then(r=>r.json())
    .then(events => setEvents(events))
  }, [])

  
  const eventList = events.filter(event => event.host.id !== user.id).map(event => <Event key={event.id} event={event} user={user}/>)
  return (
    <div>
        <h2>EventBrowser</h2>
       {events ? eventList : <p>Loading...</p>}
    </div>
  )
}

export default EventBrowser