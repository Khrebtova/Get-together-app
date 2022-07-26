import React, { useState, useContext }  from 'react'
import {UserContext} from '../context/user'
import { headers } from '../../Globals'
import Box from '@mui/material/Box';

const EventPage = ({event, onSetSelectedEvent, onUpdateEvents, onDeleteEvent, setEditEvent}) => {
  const [comment, setComment] = useState('')
  const {user} = useContext(UserContext)   
  const isHost = event.host.id === user.id
  const isAttending  = event.guests.map(guest => guest.id).includes(user.id)
  const commentList = event.comments
 
  const handleClickAttend = () => {    
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
    .then(data => {
      onUpdateEvents(data)
      onSetSelectedEvent(data)
    })
    .catch(err => console.log(err.errors))    
  }

  const handleClickUnattend = () => {
    console.log(user.username, "can't go to ", event.name)
    fetch(`/events/${event.id}/unattend/${user.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => {
      onUpdateEvents(data)
      onSetSelectedEvent(data)})
    .catch(err => console.log(err.errors))
  }
  
  const handleSubmitComment = (e) => {
    e.preventDefault()
    fetch('/comments', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        text: comment,
        event_id: event.id,
        user_id: user.id 
      })
    })
    .then(res => res.json())
    .then(event => {
      onUpdateEvents(event)
      setComment('')
      onSetSelectedEvent(event)
    })
  }

  const handleDeleteComment = (id) => {
    fetch(`/comments/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(event => {
      onUpdateEvents(event)
      onSetSelectedEvent(event)      
    })
  }

  const renderComments = () => {
    if (commentList.length > 0) {
      return commentList.map(comment => (
        <li key={comment.id}>
          {comment.author}: {comment.text}
          {comment.author === user.username ? <button onClick={()=> handleDeleteComment(comment.id)}>X</button> : null}
        </li>
      ))
    }else {
      return <p>No comments yet</p>
    }
  }

  const handleClickDelete = () => {
    onDeleteEvent(event.id)
    onSetSelectedEvent(null)
  }

  const hostEventPage = () => {
    return(
      <div >        
        <button onClick={()=>onSetSelectedEvent(null)}>X</button>
        <h3 >{event.name}</h3>
        <p >description: {event.description}</p>
        <p>host: You </p>
        <p >location: {event.location}</p>
        <p >date: {event.date}</p>
        <p >Who is going? : {event.guests.map(guest=> <span  key={guest.id}>{guest.username} </span>)}</p>
        <p>Comments:</p>
        <ul>
          {renderComments()}
          <form onSubmit={handleSubmitComment}>
            <input type="text" placeholder="Add a comment" onChange={(e)=>setComment(e.target.value)} value={comment}/>
            <button type="submit" >add</button>
          </form>
        </ul>
        <button onClick={()=> setEditEvent(true)}>Edit</button>
        <button onClick={handleClickDelete}>Delete Event</button>
      </div>
    )
  }

  const guestEventPage = () => {
    return(
      <div >
        <button onClick={()=>onSetSelectedEvent(null)} >X</button>
        <h2>{event.name}</h2>
        <p>description: {event.description}</p>
        <p>host: {event.host.username}</p>
        <p>location: {event.location}</p>
        <p>date: {event.date}</p>
        <p>Who is going? : {event.guests.map(guest=> <span  key={guest.id}>{guest.username} </span>)}</p>
        <p>Comments:</p>
        <ul>
          {renderComments()}
          <form onSubmit={handleSubmitComment}>
            <input type="text" placeholder="Add a comment" onChange={(e)=>setComment(e.target.value)} value={comment}/>
            <button type="submit" >add</button>
          </form>
        </ul>
        {isAttending ? <button onClick={handleClickUnattend}>Can't go, sorry</button> : <button onClick={handleClickAttend}>Attend Event</button>}
      </div>
    )
  }
  
  return (
    <Box 
      position='fixed' 
      ml={60}
      mt={20} 
      sx={{
      alignSelf: "center",
      width: 500,
      height: 500,
      borderRadius: 5,
      backgroundColor: 'primary.light',      
      }}>      
      {isHost ? hostEventPage() : guestEventPage()}      
    </Box>
  )
}

export default EventPage