import React, { useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import Event from '../elements/Event'
import { Box, Stack, Button, Typography, TextField, Select, MenuItem, InputLabel} from '@mui/material'
import { LoginForm, ResetButton} from '../Styles'

const EventBrowser = ({events, today, onUpdateEvents, categories, onSetSelectedEvent}) => {
  const {user} = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  
  useEffect(() => {
    onSetSelectedEvent(null)
  } , [onSetSelectedEvent]) 
  
  if (!user) return <Typography variant="h4" m={15}>Please <a href="/login">Login</a></Typography>

  const eventList = events
  .filter(event => event.host.id !== user.id)
  .filter(event => categoryFilter === '' || event.category.id === parseInt(categoryFilter))
  .filter(event => event.name.toLowerCase().includes(search) || event.host.username.toLowerCase().includes(search))
  
  const displayEvents =  eventList.map(event => <Event key={event.id} event={event} user={user} onUpdateEvents={onUpdateEvents} onSetSelectedEvent={onSetSelectedEvent} today={today}/>)
  
  const handleResetFilters = () => {
    setSearch('')
    setCategoryFilter('')
  }

  return (
    <div className='events-page'>
      <Stack direction='column' sx={{p: {xs: '0 20px', sm: '0 20px', md: '20px 40px', lg: '20px 40px' }}}>      
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', mb: '20px'}}>       
          <LoginForm >
            <TextField 
              value={search} 
              onChange={e => setSearch(e.target.value.toLowerCase())} 
              variant='outlined' 
              label='🔍 Search' 
              color='success' 
              sx={{backgroundColor: '#F6F6F6'}}
            />        
          </LoginForm>
          <LoginForm >
            <InputLabel>Filter By Category</InputLabel>
            <Select  onChange={(e)=>setCategoryFilter(e.target.value)} value={categoryFilter} color='success' >
              <MenuItem value="">Show All</MenuItem>                  
              {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
            </Select>
          </LoginForm>        
          <ResetButton onClick={handleResetFilters}>Reset</ResetButton>
        </Box>      
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
            {eventList.length > 0 ? displayEvents : <p>Nothing was found, change filters</p>}
        </Box>              
      </Stack>
    </div>
  )
}

export default EventBrowser