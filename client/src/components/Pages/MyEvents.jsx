import React, { useContext, useEffect} from 'react'
import Event from '../elements/Event'
import MyEvent from '../elements/MyEvent'
import {UserContext} from '../context/user'
import { Box, Typography, Stack, Fab} from '@mui/material'

const MyEvents = ({events, onUpdateEvents, onSetSelectedEvent, onDeleteEvent, setEditEvent, today}) => {
  const {user} = useContext(UserContext)
  const [displayHostingEvents, setDisplayHostingEvents] = React.useState(true)

  useEffect(() => {
    onSetSelectedEvent(null)
  } , [onSetSelectedEvent])

  if (!user) return <Typography variant="h4" m={15} >Please <a href="/login">Login</a></Typography>

  const hostingEvents = events.filter(event => event.host.id === user.id)
  const attendingEvents = events.filter(event => event.guests.map(guest=>guest.id).includes(user.id))

  const listEventsHosting = hostingEvents.map(event => <MyEvent 
    key={event.id} 
    event={event} 
    today={today}
    user={user} 
    onUpdateEvents={onUpdateEvents} 
    onSetSelectedEvent={onSetSelectedEvent} 
    onDeleteEvent={onDeleteEvent}
    setEditEvent={setEditEvent}
    />)

  const listEventsAttending = attendingEvents.map(event => <Event 
    key={event.id} 
    event={event}
    today={today} 
    user={user} 
    onUpdateEvents={onUpdateEvents} 
    onSetSelectedEvent={onSetSelectedEvent}
    />)  
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, mt: '120px', p: '40px'}}>
      
      <Stack direction="row" justifyContent='center' spacing={2} sx={{mb: 2}}>
        <Fab 
          onClick={()=>setDisplayHostingEvents(true)} 
          variant="extended" 
          sx={{
            width: '200px',
            color: displayHostingEvents ? '#f6f6f6' : '#212121', 
            bgcolor:  displayHostingEvents ? '#212121' : '',
            '&:hover': {backgroundColor: '#83978f'}
          }}
        >
          I'm Host
        </Fab> 
        <Fab 
          onClick={()=>setDisplayHostingEvents(false)} 
          variant="extended" 
          sx={{
            width: '200px',
            color: displayHostingEvents ? '#212121' : '#f6f6f6', 
            bgcolor:  displayHostingEvents ? '' : '#212121',
            '&:hover': {backgroundColor: '#83978f'}
        }}
        >
          I'm Guest
        </Fab>
      </Stack>

      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          flexWrap: 'wrap'
        }}
      >
        {displayHostingEvents? listEventsHosting : listEventsAttending}
      </Box>      
      
    </Box>
  )
}

export default MyEvents