import React, { useContext, useEffect} from 'react'
import Event from '../elements/Event'
import MyEvent from '../elements/MyEvent'
import {UserContext} from '../context/user'

const MyEvents = ({events, onUpdateEvents, onSetSelectedEvent, onDeleteEvent}) => {
  const {user} = useContext(UserContext)
    
  useEffect(() => {
    onSetSelectedEvent(null)
  } , [onSetSelectedEvent])

  if (!user) return <p>Please log in to see events</p>

  const hostingEvents = events.filter(event => event.host.id === user.id)
  const attendingEvents = events.filter(event => event.guests.map(guest=>guest.id).includes(user.id))

  const listEventsHosting = hostingEvents.map(event => <MyEvent 
    key={event.id} 
    event={event} 
    user={user} 
    onUpdateEvents={onUpdateEvents} 
    onSetSelectedEvent={onSetSelectedEvent} 
    onDeleteEvent={onDeleteEvent}
    />)

  const listEventsAttending = attendingEvents.map(event => <Event 
    key={event.id} 
    event={event} 
    user={user} 
    onUpdateEvents={onUpdateEvents} 
    onSetSelectedEvent={onSetSelectedEvent}
    />)  
  
  return (
    <div>
      <h2>My events</h2> 
      <div style={{display: "flex", justifyContent: 'space-around', flexDirection: 'row', alignItems: 'stretch'}}>
            <div style={{backgroundColor: 'pink'}}>
              <h3>Hosting, {hostingEvents.length} events</h3>
              {listEventsHosting}
            </div>
            <div style={{backgroundColor: 'orange'}}>
              <h3>Attending, {attendingEvents.length} events</h3>
              {listEventsAttending}
            </div>
        </div>      
    </div>
  )
}

export default MyEvents