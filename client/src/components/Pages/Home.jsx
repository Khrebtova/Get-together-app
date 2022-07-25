import React, { useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'

const Home = ({onSetSelectedEvent, events}) => {
  const {user} = useContext(UserContext)
  const [lastComments, setLastComments] = useState([])
  
  useEffect(() => {
    onSetSelectedEvent(null)
    fetch('/comments/last_five')
    .then(res => res.json())
    .then(comments => setLastComments(comments))
  } , [onSetSelectedEvent])

  if (!user) return <p>Please log in to see Home Page</p>

  const handleSelectEvent = (id) => {    
    const event = events.find(event => event.id === id)
    onSetSelectedEvent(event)
  }

  const renderLastComments =()=> {
    return lastComments.map(comment =><p key={comment.id} onClick={()=>handleSelectEvent(comment.event.id)}>
      {comment.user.username} said on '{comment.event.name}' : "{comment.text}"</p>
    )}
  
  const renderLastEvents = () => {
      const lastEvents = events.slice(-3)
      return lastEvents.map(event =><p key={event.id} onClick={()=>onSetSelectedEvent(event)}>{event.name}, by {event.host.username}</p>)
    }

  return (
    <div>
      <h1>Welcome to 'Get Together', {user.username}!</h1>
      <h4>Here some last comments, if you missed: </h4>
      {renderLastComments()}
      <h4>Here newest events, if you missed: </h4>
      {renderLastEvents()}   
    </div>
  )
}

export default Home