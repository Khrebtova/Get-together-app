import React from 'react'
import {headers } from '../../Globals'
const Event = ({event, user}) => {
  
  const handleClickAttend = () => {
    console.log(user.username, "attending", event.name)
    fetch('/participations', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event_id: event.id,
        user_id: user.id
      })
    })
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.errors))
    
    // fetch(`/events/${event.id}/attend`, {})
  }
  const myEvent = () =>{
    return (
      <>
        <h4>{event.name}</h4>      
        <p>Category: {event.category.name}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
      </>
    )
  }
  const browseEvent = () =>{
    return(
      <>
        <h4>{event.name}</h4>
        {event.host.id === user.id ? <p>You are the host of this event</p> : <p>Host: {event.host.username}</p>}
        <p>Category: {event.category.name}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
        {event.host.id === user.id ? null : <button onClick={handleClickAttend}>Attend Event</button>}
      </>
    )

  }
  return (
    <div style={{border: "solid", borderColor: "green"}}>
      {event.host ? browseEvent() : myEvent()}
    </div>
  )
}

export default Event