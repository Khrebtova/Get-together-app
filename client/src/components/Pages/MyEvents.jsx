import React, { useContext, useEffect} from 'react'
import Event from '../elements/Event'
import MyEvent from '../elements/MyEvent'
import {UserContext} from '../context/user'
import { Box, Typography, Divider} from '@mui/material'

const MyEvents = ({events, onUpdateEvents, onSetSelectedEvent, onDeleteEvent, setEditEvent, today}) => {
  const {user} = useContext(UserContext)
    
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
      <Typography variant="h4" >
          My Events
      </Typography>
      <Divider />
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', mb: 1, mt: 2}}> 

            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2, bgcolor: '#f3c460'}}>
              <Typography variant='h5' mt={2}>Hosting, {hostingEvents.length} events</Typography>
              {listEventsHosting}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2, bgcolor: '#f3c460'}}>
              <Typography variant='h5' mt={2}>Attending, {attendingEvents.length} events</Typography>
              {listEventsAttending}
            </Box>
        
        </Box>      
    </Box>
  )
}

export default MyEvents