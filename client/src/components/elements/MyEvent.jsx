import React from 'react'

const MyEvent = ({event, user, onUpdateEvents, onDeleteEvent, onSetSelectedEvent}) => {
  return (
    <div  style={{border: "solid", borderColor: "white"}}>
        <h4 onClick={()=>onSetSelectedEvent(event)}>{event.name}</h4>         
        <p>Date: {event.date}</p>      
        <p>People attending: {event.guest_count}</p>
        {event.comments ? <p> Comments: {event.comments.length} </p> :<p> No comments yet</p>}
        
        <button onClick = {()=>onDeleteEvent(event.id)}>Delete </button>
    </div>
  )
}

export default MyEvent