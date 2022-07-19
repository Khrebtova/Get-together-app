import React from 'react'

const Event = ({event}) => {
  return (
    <div>
      <h4>{event.name}</h4>
      <p>Category: {event.category.name}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>      
      
    </div>
  )
}

export default Event