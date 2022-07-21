import React from 'react'
import {headers } from '../../Globals'

const Event = ({event, user, onUpdateEvents, onSetSelectedEvent, onDeleteEvent}) => {
  
  const attending  = event.guests.map(guest => guest.id).includes(user.id)
  
  const handleClickAttend = () => {
    console.log(user.username, "attending", event.name)
    // fetch (`/participations/${event.id}/${user.id}`, {
    fetch(`/events/${event.id}/attend/${user.id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event_id: event.id,
        user_id: user.id
      })
    })
    .then(r => r.json())
    .then(data => onUpdateEvents(data))
    .catch(err => console.log(err.errors))    
  }

  const handleClickUnattend = () => {
    console.log(user.username, "can't go to ", event.name)
    fetch(`/events/${event.id}/unattend/${user.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => onUpdateEvents(data))
    .catch(err => console.log(err.errors))
  }
  

  // const browseEvent = () =>{
  //   return(
  //     < div onClick={()=>onSetSelectedEvent(event)}>
  //       <h4>{event.name}</h4>
  //       {event.host.id === user.id ? <p>You are the host of this event</p> : <p>Host: {event.host.username}</p>}      
  //       <p>Date: {event.date}</p>      
  //       {attending ? <p>People attending: You + {event.guest_count - 1} </p> : <p>People attending: {event.guest_count}</p>}
        
  //       {attending ? <button onClick={handleClickUnattend}>Can't go, sorry</button> : <button onClick={handleClickAttend}>Attend Event</button>}
  //     </div>
  //   )
  // }

  return (
    <div style={{border: "solid", borderColor: "green"}}>
      < div >
        <h4 onClick={()=>onSetSelectedEvent(event)}>{event.name}</h4>
        {event.host.id === user.id ? <p>You are the host of this event</p> : <p>Host: {event.host.username}</p>}      
        <p>Date: {event.date}</p>      
        {attending ? <p>People attending: You + {event.guest_count - 1} </p> : <p>People attending: {event.guest_count}</p>}
        
        {attending ? <button onClick={handleClickUnattend}>Can't go, sorry</button> : <button onClick={handleClickAttend}>Attend Event</button>}
      </div>
    </div>
  )
}

export default Event