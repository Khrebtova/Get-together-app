import React, { useState, useContext }  from 'react'
import {UserContext} from '../context/user'
import { headers } from '../../Globals'
import {Box, Card, CardActions, CardContent, Button, Typography, Divider, FormControl, TextField, IconButton, Icon, CardHeader} from '@mui/material';

const EventPage = ({event, today, onSetSelectedEvent, onUpdateEvents, onDeleteEvent, setEditEvent}) => {
  const [comment, setComment] = useState('')
  const {user} = useContext(UserContext)   
  const isHost = event.host.id === user.id
  const isAttending  = event.guests.map(guest => guest.id).includes(user.id)
  const commentList = event.comments
  const eventHappened = event.date < today;

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
    .then(data => {
      onUpdateEvents(data)
      onSetSelectedEvent(data)
    })  
  }

  const handleClickUnattend = () => {
    fetch(`/api/events/${event.id}/unattend/${user.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => {
      onUpdateEvents(data)
      onSetSelectedEvent(data)
    })
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
      onSetSelectedEvent(event)
    })
  }

  const handleDeleteComment = (id) => {
    fetch(`/api/comments/${id}`, {
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
        <Typography key={comment.id} component='li'>
          {comment.author}: {comment.text}
          {comment.author === user.username ? <IconButton onClick={()=> handleDeleteComment(comment.id)}><Icon color='error' fontSize="small">delete</Icon></IconButton> : null}
        </Typography>
      ))
    }else {
      return <p>No comments yet</p>
    }
  }

  const renderGuestList =() => {
    if (event.guests.length === 0) return <p>No one is attending</p>
    return event.guests.map(guest => <Typography component='li' key={guest.id}>{guest.username}</Typography>)
  }

  const handleClickDelete = () => {
    onDeleteEvent(event.id)
    onSetSelectedEvent(null)
  }

  const renderGuestButtons = () => {
    if (isAttending) {
      if (eventHappened) {
        return <Button size="small" variant="contained" color="error" onClick={handleClickUnattend}>Delete from my list</Button>
      }else{
        return <Button size="small" variant="contained" color="success" onClick={handleClickUnattend}>Can't go</Button>
      }
    }else{
      if (eventHappened) {
        return <Button size="small" variant="contained" disabled>Attend event</Button>
      }else{
        return <Button size="small" variant="contained" color="success" onClick={handleClickAttend}>Attend</Button>
      }
    }    
  }

  const renderHostButtons = () => {
    return(
      <div>
        <Button size="small" variant="contained" color="error" onClick={handleClickDelete}><Icon color='white' fontSize="small">delete</Icon> Delete</Button>
        <Button size="small" variant="contained" color="success" onClick={()=> setEditEvent(true)}><Icon color='white' fontSize="small">edit</Icon>Edit</Button>
      </div>
    )}
  
  return (
    <Box sx={{width: '100%', display: 'flex', position: 'fixed', zIndex: 'modal', flexDirection: 'column', bgcolor: '#212121'}}>
      <Card variant='outlined'  sx={{m: 2}}>                   
        <CardHeader 
          title={event.name}
          subheader={event.date} 
          action={<IconButton onClick={()=> onSetSelectedEvent(null)}><Icon color='error' fontSize="small">close</Icon></IconButton>}
        />        
        <CardContent>
          {eventHappened ? <Typography color="error" gutterBottom> !!This event has already happened</Typography> : null}  
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {event.category.name} event created by {event.host.username}
          </Typography>          

          <Divider />        
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
        <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          {isHost ? renderHostButtons() : renderGuestButtons()}     
          {/* <Button size='small' sx={{width: '30px', color: '#212121', fontWeight: '700'}} mb={2} mt={2} onClick={()=>onSetSelectedEvent(null)}>X</Button> */}
        </CardActions>
      </Card>
       
    </Box>
  )
}

export default EventPage