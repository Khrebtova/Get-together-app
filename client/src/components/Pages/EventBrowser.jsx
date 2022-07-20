import React, { useContext} from 'react'
import {UserContext} from '../context/user'
import Event from '../elements/Event'

const EventBrowser = ({events, onUpdateEvents, categories}) => {
  const {user} = useContext(UserContext)
   
  const eventList = events.filter(event => event.host.id !== user.id).map(event => <Event key={event.id} event={event} user={user} onUpdateEvents={onUpdateEvents}/>)
  return (
    <div>
        <h2>EventBrowser</h2>
       {events ? eventList : <p>Loading...</p>}
    </div>
  )
}

export default EventBrowser