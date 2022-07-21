import React from 'react'
import {headers } from '../../Globals'

const MyEvent = ({event, user, onUpdateEvents, onDeleteEvent}) => {
  return (
    <div>
        <h4>{event.name}</h4>      
        {/* <p>Category: {event.category.name}</p> */}
        {/* <p>Location: {event.location}</p> */}
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
        
        <button >Edit</button>
        <button onClick = {()=>onDeleteEvent(event.id)}>Delete </button>
    </div>
  )
}

export default MyEvent