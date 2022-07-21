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

  const renderLastComments =()=> {
    return lastComments.map(comment =><p key={comment.id} onClick={()=>onSetSelectedEvent(comment.event)}>
      {comment.user.username} said on '{comment.event.name}' : "{comment.text}"</p>
    )}
  
    const renderLastEvents = () => {
      const lastEvents = events.slice(-3)
      return lastEvents.map(event =><p key={event.id} onClick={()=>onSetSelectedEvent(event)}>{event.name}, by {event.host.username}</p>)
    }
  return (
    <div>
      {user? <h1>Welcome to 'Get Together', {user.username}!</h1> : <h1>Welcome to 'Get Together', please Login</h1>}
      <h4>Here some last comments, if you missed: </h4>
      {renderLastComments()}
      <h4>Here newest events, if you missed: </h4>
      {renderLastEvents()}
    </div>
  )
}

export default Home