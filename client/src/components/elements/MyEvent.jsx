import React, {useState} from 'react'
import {Card, CardActions, CardContent, Button, Typography, Divider, Collapse, FormControl, TextField, IconButton, Icon }from '@mui/material';
import {headers } from '../../Globals'

const MyEvent = ({event, user, onUpdateEvents, onDeleteEvent, onSetSelectedEvent, setEditEvent, today}) => {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('')
  const commentList = event.comments;

  const eventHappened = event.date < today;
  
  const renderGuestList =() => {
    if (event.guests.length === 0) return <p>No one is attending</p>
    return event.guests.map(guest => <Typography component='li' key={guest.id}>{guest.username}</Typography>)
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
        <Typography key={comment.id} component='li'>
          {comment.author}: {comment.text}
          {comment.author === user.username ? <IconButton onClick={()=> handleDeleteComment(comment.id)}><Icon color='error' fontSize="small">delete</Icon></IconButton> : null}
        </Typography>
      ))
    }else {
      return <p>No comments yet</p>
    }
  }

  const handleClickEdit = () => {
    setEditEvent(true)
    onSetSelectedEvent(event)
  }
  
  return (
    <Card variant='outlined'  sx={{ width: 400, m: 2}}>
      <CardContent>
        {eventHappened ? <Typography color="error" gutterBottom> !!This event has already happened</Typography> : null}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your {event.category.name} event 
        </Typography>
        <Typography variant="h5" component="div">
         {event.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {event.date}
        </Typography>
        <Divider />
        <Typography variant="body1" component="p">
          Going: {event.guest_count}
          <br />
          Comments: {event.comments.length}
        </Typography>              
      </CardContent>  
      <CardActions>
        <Button size="small" variant="contained" color="error" onClick={()=>onDeleteEvent(event.id)}>Delete Event</Button>
        <Button size="small" variant="contained" color="primary" onClick={handleClickEdit}>Edit Event</Button>
        <Button size="small" color="secondary" onClick={()=>setExpanded(!expanded)}>{expanded ? 'Show less ↑' : 'Show More ↓'}</Button>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Typography paragraph>Who is going:</Typography>
          <Typography variant="body2" color="text.secondary" component="ul">
            {renderGuestList()}
          </Typography>
          <Typography paragraph>Comments:</Typography>
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

export default MyEvent