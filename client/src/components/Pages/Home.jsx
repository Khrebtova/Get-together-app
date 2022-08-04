import React, { useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import { Box, Typography, Divider, Paper, Button} from '@mui/material'

const Home = ({onSetSelectedEvent, events, today}) => {
  const {user} = useContext(UserContext)
 
  const [loading, setLoading] = useState(true)
  const [lastComments, setLastComments] = useState([])
  const [lastEvents, setLastEvents] = useState([])
  
  useEffect(() => {    
    fetch('/api/comments/last_five')
    .then(res => res.json())
    .then(comments => setLastComments(comments))

    fetch('/api/events/last_five')
    .then(res => res.json())
    .then(events => {setLastEvents(events); setLoading(false)})
  } , [user])  

  if (!user) return <Typography variant="h4" m={15} >Please <a href="/login">Login</a></Typography>

  const handleSelectEvent = (id) => {    
    const event = events.find(event => event.id === id)
    onSetSelectedEvent(event)
  }

  const renderLastComments =()=> {
    return lastComments.map(comment =>
      <Typography component="li" key={comment.id} >
        {comment.author} said on <Button size="small" onClick={()=>handleSelectEvent(comment.event.id)}>{comment.event.name}</Button> : "{comment.text}"
      </Typography>
    )}
  
  const renderLastEvents = () => {      
      return lastEvents.map(event =><Typography component="li" key={event.id}><Button size='small' onClick={()=>onSetSelectedEvent(event)}>{event.name}</Button>, by {event.host.username}</Typography>)
    }

  const renderTodayEvents = () => {
      const todayEvents = events.filter(event => event.date === today)
      if (todayEvents.length === 0) return <p>No events today</p>      
      return todayEvents.map(event => <li key={event.id}><Button onClick={()=>onSetSelectedEvent(event)}>{event.name}</Button></li>)
    }     

  return (
    <Box sx={{display: 'flex' , flexDirection: 'column', justifyContent: 'center', mb: 1, mt: 12, ml: 10, mr: 10}} >
      <Typography variant="h3">Welcome, {user.username}!</Typography>
        <Divider />
      <Box sx={{bgcolor: '#f3c460', mt: 5}}>
        <Paper elevation={3}  sx={{ mt: 5, mr: 2, ml: 2}}>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', m: 2}}>
            <Typography variant='h6'>Events happening today: </Typography>
            <ul>
              {renderTodayEvents()}
            </ul>
          </Box>
        </Paper>
        <Paper elevation={3}  sx={{ mt: 5, mr: 2, ml: 2}}>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', m: 2}}>
          <Typography variant='h6'>Here some newest comments, if you missed: </Typography>
          <ul>
            {loading ? <Typography>Loading..</Typography> : renderLastComments()}
          </ul>
          </Box>
        </Paper> 
        <Paper elevation={3}  sx={{ mt: 5, mr: 2, ml: 2}}>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', m: 2}}>
          <Typography variant='h6'>Here some newest events, if you missed: </Typography>
          <ul>
            {loading ? <Typography>Loading..</Typography> : renderLastEvents()}
          </ul>   
          </Box>
        </Paper>
        </Box>      
    </Box>
  )
}

export default Home