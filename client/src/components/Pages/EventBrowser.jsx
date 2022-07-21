import React, { useContext, useEffect} from 'react'
import {UserContext} from '../context/user'
import Event from '../elements/Event'

const EventBrowser = ({events, onUpdateEvents, categories, onSetSelectedEvent}) => {
  const {user} = useContext(UserContext)
  
  useEffect(() => {
    onSetSelectedEvent(null)
  } , [onSetSelectedEvent]) 

  const eventList = events.filter(event => event.host.id !== user.id).map(event => <Event key={event.id} event={event} user={user} onUpdateEvents={onUpdateEvents} onSetSelectedEvent={onSetSelectedEvent}/>)
  return (
    <div>
        <h2>EventBrowser</h2>
        <div style={{display: "flex", justifyContent: 'space-around', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
          {events ? eventList : <p>Loading...</p>}
        </div>       
    </div>
  )
}

export default EventBrowser