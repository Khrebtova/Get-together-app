import React from 'react'

const MyEvent = ({event, user, onUpdateEvents, onDeleteEvent, onSetSelectedEvent}) => {
  return (
    <div  style={{border: "solid", borderColor: "white"}}>
        <h4 onClick={()=>onSetSelectedEvent(event)}>{event.name}</h4>         
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
        
        <button >Edit</button>
        <button onClick = {()=>onDeleteEvent(event.id)}>Delete </button>
    </div>
  )
}

export default MyEvent