import React from 'react'
import {headers } from '../../Globals'

const Event = ({event, user, onUpdateEvents}) => {
  const hosting = event.host.id === user.id  
  
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

  const myEvent = () =>{
    return (
      <>
        <h4>{event.name}</h4>      
        <p>Category: {event.category.name}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
        <button >Edit</button>
        <button>Delete </button>
      </>
    )
  }

  const browseEvent = () =>{
    const attending  = event.guests.map(guest => guest.id).includes(user.id)
    return(
      <>
        <h4>{event.name}</h4>
        {event.host.id === user.id ? <p>You are the host of this event</p> : <p>Host: {event.host.username}</p>}
        <p>Category: {event.category.name}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
        {attending ? <button onClick={handleClickUnattend}>Can't go, sorry</button> : <button onClick={handleClickAttend}>Attend Event</button>}
      </>
    )
  }

  return (
    <div style={{border: "solid", borderColor: "green"}}>
      {hosting ?  myEvent() : browseEvent()}
    </div>
  )
}

export default Event