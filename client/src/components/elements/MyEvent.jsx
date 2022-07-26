import React, {useState} from 'react'
import {Card, CardActions, CardContent, Button, Typography, Divider, Collapse, FormControl, TextField, IconButton, Icon, Tooltip }from '@mui/material';
import {headers } from '../../Globals'
import { EventButtonGreen } from '../Styles';

const MyEvent = ({event, user, onUpdateEvents, onDeleteEvent, onSetSelectedEvent, setEditEvent, today}) => {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('')
  const commentList = event.comments;

  const eventHappened = event.date < today;
  
  const renderGuestList =() => {
    if (event.guests.length === 0) return <p>No one is attending</p>
    return event.guests.map(guest => <Typography variant="body2" component='li' key={guest.id}>{guest.username}</Typography>)
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

  const handleClickEdit = () => {
    setEditEvent(true)
    onSetSelectedEvent(event)
  }
  
  return (
    <Card 
      variant='outlined'  
      sx={{ 
        width: {xl: 350, lg: 350, md: 350, sm: 350, xs: 400}, 
        m: 1,  
        boxShadow: 7, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between' 
      }}
    >
      <CardContent>
        {eventHappened ? <Typography color="error" gutterBottom> !!This event has already happened</Typography> : null}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your {event.category.name} event 
        </Typography>
        <Tooltip title='Click to see details'>
          <Typography variant="h5" component="div" onClick={()=>onSetSelectedEvent(event)}>
            {event.name}
          </Typography>
        </Tooltip>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {event.date}
        </Typography>
        <Divider />
        <Typography variant="body1" component="p">
          Going: {event.guests.length}
          <br />
          Comments: {event.comments.length}
        </Typography>              
      </CardContent>  
      <CardActions >
        <Button size="small" variant="contained" color="error" onClick={()=>onDeleteEvent(event.id)}>Delete</Button>
        <EventButtonGreen size="small" variant="contained" color="primary" onClick={handleClickEdit}>Edit</EventButtonGreen>
        <Button size="small" color="success" onClick={()=>setExpanded(!expanded)}>{expanded ? 'Show less ↑' : 'Show More ↓'}</Button>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography >Details:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Typography >Who is going:</Typography>
          <Typography paragraph variant="body2" color="text.secondary" component="ul">
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

export default MyEvent