import React from 'react'

const EventPage = ({event, onSetSelectedEvent}) => {
  return (
    <div style={{border: 'solid red'}}>
      {event.name} details page
      <button onClick={()=>onSetSelectedEvent(null)}>Close</button>
    </div>
  )
}

export default EventPage