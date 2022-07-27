import React, { useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import Event from '../elements/Event'
import { Box, Button, Typography, Divider, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

const EventBrowser = ({events, onUpdateEvents, categories, onSetSelectedEvent}) => {
  const {user} = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  
  useEffect(() => {
    onSetSelectedEvent(null)
  } , [onSetSelectedEvent, user]) 
  
  if (!user) return <p>Please log in to see the event browser</p>

  const eventList = events
  .filter(event => event.host.id !== user.id)
  .filter(event => categoryFilter === '' || event.category.id === parseInt(categoryFilter))
  .filter(event => event.name.toLowerCase().includes(search) || event.host.username.toLowerCase().includes(search))
  

  const displayEvents =  eventList.map(event => <Event key={event.id} event={event} user={user} onUpdateEvents={onUpdateEvents} onSetSelectedEvent={onSetSelectedEvent}/>)
  
  const handleResetFilters = () => {
    setSearch('')
    setCategoryFilter('')
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, mt: 10, ml: 10, mr: 10}}>      
      <Box sx={{display: 'flex' , flexDirection: 'row'}}>
        <Typography variant="h3" m={2}>
          Event Browser 
        </Typography>
        <TextField variant='outlined' label='🔍 Search' value={search} onChange={e => setSearch(e.target.value.toLowerCase())} sx={{m: 2}}/>
        <FormControl variant="outlined" sx={{ minWidth: 200, m: 2}}>
          <InputLabel >Select Category</InputLabel>
          <Select  onChange={(e)=>setCategoryFilter(e.target.value)} value={categoryFilter}>
            <MenuItem value="">Show All</MenuItem>                  
            {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
          </Select>
        </FormControl>        
        <Button size='large' color="success" sx={{m: 2, height: 55}} onClick={handleResetFilters}> Reset all filters</Button>
      </Box>
      
      <Divider />

      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', mb: 1, mt: 5, bgcolor: '#f3c460'}}>
          {eventList.length > 0 ? displayEvents : <p>Nothing was found, change filters</p>}
      </Box>       
              
    </Box>
  )
}

export default EventBrowser