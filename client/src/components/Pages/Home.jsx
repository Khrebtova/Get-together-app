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
        {comment.author} said on <Button color='success' size="small" onClick={()=>handleSelectEvent(comment.event.id)}>{comment.event.name}</Button> : "{comment.text}"
      </Typography>
    )}
  
  const renderLastEvents = () => {      
      return lastEvents.map(event =><Typography component="li" key={event.id} ><Button color='success' size='small' onClick={()=>onSetSelectedEvent(event)}>{event.name}</Button>, created by {event.host.username}</Typography>)
    }

  const renderTodayEvents = () => {
      const todayEvents = events.filter(event => event.date === today)
      if (todayEvents.length === 0) return <p>No events today</p>      
      return todayEvents.map(event => <li key={event.id}><Button color='success' onClick={()=>onSetSelectedEvent(event)}>{event.name}</Button></li>)
    }     

  return (        
      <Box className='homepage'>      
        <Box sx={{display: 'grid', gridTemplateColumns: {lg: '1fr 1fr 1fr', md: '1fr 1fr 1fr', sm: '1fr'}, justifyContent: 'center'}}>
          <Paper elevation={10}  sx={{ mt: 5, mr: 2, ml: 2}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', m: 2}}>
              <Typography variant='h6'>Events happening today: </Typography>
              <Divider sx={{color: '#6D9886', m: '15px 0'}}/>
              <ul>
                {renderTodayEvents()}
              </ul>
            </Box>
          </Paper>
          <Paper elevation={10}  sx={{ mt: 5, mr: 2, ml: 2}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', m: 2}}>
              <Typography variant='h6'>New comments: </Typography>
              <Divider sx={{color: '#6D9886', m: '15px 0'}}/>
              <ul>
                {loading ? <Typography>Loading..</Typography> : renderLastComments()}
              </ul>
            </Box>
          </Paper> 
          <Paper elevation={10}  sx={{ mt: 5, mr: 2, ml: 2}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', m: 2}}>
              <Typography variant='h6'>New events: </Typography>
              <Divider sx={{color: '#6D9886', m: '15px 0'}}/>
              <ul>
                {loading ? <Typography>Loading..</Typography> : renderLastEvents()}
              </ul>   
            </Box>
          </Paper>
          </Box>
          <p className='photo-reference'>Photo by <a href="https://unsplash.com/@spencerdavis?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Spencer Davis</a> on <a href="https://unsplash.com/s/photos/friends?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>      
      </Box>
    
  )
}

export default Home