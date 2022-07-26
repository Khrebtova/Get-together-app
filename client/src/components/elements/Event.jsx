import React, { useState} from 'react'
import {headers } from '../../Globals'
import {Card, CardActions, CardContent, Button, Typography, Divider, Collapse, FormControl, TextField, IconButton, Icon, Tooltip }from '@mui/material';
import { EventButtonGreen, EventButtonBlack } from '../Styles';

const Event = ({event, user, onUpdateEvents, today, onSetSelectedEvent, onDeleteEvent}) => {
  
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('')
  const commentList = event.comments
  const attending  = event.guests.map(guest => guest.id).includes(user.id)
  const eventHappened = event.date < today;

  const renderGuestCount = () => {
    if (event.guests.length === 0) return <span>be the first one!</span>
    if (attending && event.guests.length === 1) return <span>You</span>
    if (!attending && event.guests.length === 1) return <span>1 person</span>
    if (attending && event.guests.length > 1) return <span>You and {event.guests.length - 1} more</span>
    if (!attending && event.guests.length > 1) return <span>{event.guests.length} people</span>
  }

  const renderGuestList =() => {
    if (event.guests.length === 0) return <p>No one is attending</p>
    return event.guests.map(guest => <Typography variant="body2" component='li' key={guest.id}>{guest.username}</Typography>)
  }

  const renderCommentCount = () => {
    if (event.comments.length === 0) return <span>No comments yet</span>
    if (event.comments.length === 1) return <span>1 comment</span>
    if (event.comments.length > 1) return <span>{event.comments.length} comments</span>
  }  

  const handleClickAttend = () => {    
    fetch(`/api/events/${event.id}/attend/${user.id}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event_id: event.id,
        user_id: user.id
      })
    })
    .then(r => r.json())
    .then(data => onUpdateEvents(data))        
  }

  const handleClickUnattend = () => {
    fetch(`/api/events/${event.id}/unattend/${user.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => onUpdateEvents(data))
  }

  const renderButtons = () => {
    if (attending) {
      if (eventHappened) {
        return <Button size="small" variant="contained" color="error" onClick={handleClickUnattend}>Delete from my list</Button>
      }else{
        return <EventButtonBlack size="small" variant="contained" color="success" onClick={handleClickUnattend}>Can't go</EventButtonBlack>
      }
    }else{
      if (eventHappened) {
        return <Button size="small" variant="contained" disabled>Attend</Button>
      }else{
        return <EventButtonGreen size="small"  onClick={handleClickAttend}>Attend</EventButtonGreen>
      }
    }    
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    fetch('/api/comments', {
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
    })
  }

  const handleDeleteComment = (id) => {
    fetch(`/api/comments/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(event => {
      onUpdateEvents(event)            
    })
  }

  const renderComments = () => {
    if (commentList.length > 0) {
      return commentList.map(comment => (
        <Typography key={comment.id} component='li' variant="body2">
          {comment.author}: {comment.text}
          {comment.author === user.username ? <IconButton onClick={()=> handleDeleteComment(comment.id)}><Icon color='error' fontSize="small">delete</Icon></IconButton> : null}
        </Typography>
      ))
    }else {
      return <p>No comments yet</p>
    }
  }
  
  return (
    <Card variant='outlined' sx={{ width: {xl: 350, lg: 350, md: 300, sm: 300, xs: 400}, m: 1,  boxShadow: 7, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
      <CardContent >
        {eventHappened ? <Typography color="error" > ! already happened !</Typography> : null}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {event.category.name} event created by {event.host.username}
        </Typography>        
        <Tooltip title='Click to see details'>
          <Typography variant="h5" component="div" onClick={()=>onSetSelectedEvent(event)} >
            {event.name}
          </Typography>          
        </Tooltip>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {event.date}
        </Typography>
        <Divider />        
        <Typography variant="body1" component="p">          
          Going: {renderGuestCount()}    
          <br />      
          {renderCommentCount()}
        </Typography>        
      </CardContent>
      <CardActions >        
        {renderButtons()}
        <Button size="small" color="success" onClick={()=>setExpanded(!expanded)}>{expanded ? 'Show less ↑' : 'Show More ↓'}</Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography >Details:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Typography >Who is going:</Typography>
          <Typography variant="body2" color="text.secondary" component="ul" paragraph>
            {renderGuestList()}
          </Typography>
          <Typography >Comments:</Typography>
          <Typography variant="body2" color="text.secondary" component="ul">
            {renderComments()}
          </Typography>
          <FormControl >
            <TextField label="Add Comment" value={comment} onChange={e => setComment(e.target.value)} variant="standard" size="small"/>
          </FormControl>
          <FormControl >   
            <IconButton onClick={handleSubmitComment}>
              <Icon sx={{ color: 'green', mt: 1 }}>add_circle</Icon>
            </IconButton>
          </FormControl>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Event