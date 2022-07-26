import React , { useState } from 'react'
import { headers } from '../../Globals'
import {Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Divider } from '@mui/material'

const UpdateEventForm = ({event, categories, onUpdateEvents, onSetSelectedEvent, setEditEvent, onAddCategory}) => {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [editedEvent, setEditedEvent] = useState({
        name: event.name,
        date: event.date,
        description: event.description,
        location: event.location,
        category_id: event.category.id,
        newCategory: '',
        id: event.id
    })
    

    const handleChange = (e) => {
        setEditedEvent({...editedEvent, [e.target.name]: e.target.value})
    }

    const handleNewCategoryEnter = (e) => {
        if (e.target.value === '') {
            setIsNewCategory(false)            
        } else {
            setIsNewCategory(true)
            setEditedEvent({
                ...editedEvent,
                newCategory: e.target.value, 
                category_id: ''
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()        
        setIsLoading(true)
        let strongParams;
        if (isNewCategory) {
            strongParams = {                
                name: editedEvent.name,
                description: editedEvent.description,
                location: editedEvent.location,
                date: editedEvent.date,
                category_attributes: {name: editedEvent.newCategory}
            }} else {
            strongParams = {               
                category_id: editedEvent.category_id,
                name: editedEvent.name,
                description: editedEvent.description,
                location: editedEvent.location,
                date: editedEvent.date,
            }}        
        
        fetch(`/events/${event.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(strongParams)
        })
        .then(res => {
            setIsLoading(false)
            if (res.ok) {
                res.json().then(event => {                    
                    console.log("event updated")
                    setEditEvent(false)
                    onUpdateEvents(event)
                    onAddCategory(event.category)
                    onSetSelectedEvent(event)
                })
            }else{
                res.json().then(err => setErrors(err.errors))
            }})      
    }


  return (
    <Box position='fixed' ml={40} mt={10} 
      sx={{
      width: 700,
      minHeight: 500,
      borderRadius: 5,
      backgroundColor: 'primary.light', 
      display: 'flex', 
      flexDirection: 'column',     
    }}>
        <Typography variant="h6" ml={2} mb={2} mt={2} color={'white'}>
            Update Event 
        </Typography>        
        <Button variant="contained" color="secondary" mb={2} mt={2} onClick={() => setEditEvent(false)}> CANCEL </Button>
         
        <FormControl variant="outlined" sx={{ m: 1, bgcolor: 'background.paper' }}>                      
            <TextField variant='outlined' name='name' value={editedEvent.name} onChange={handleChange} placeholder="Name"/>
        </FormControl>
        <FormControl variant="outlined" sx={{ m: 1, bgcolor: 'background.paper' }}>                
            <TextField variant='outlined' name='description' value={editedEvent.description} onChange={handleChange} placeholder="Description" />
        </FormControl>
        <FormControl variant="outlined" sx={{ m: 1, bgcolor: 'background.paper' }}>
            <InputLabel >Select Category</InputLabel>
            <Select name="categoryId"  onChange={handleChange} disabled={isNewCategory} >                  
                {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ m: 1, bgcolor: 'background.paper' }}>
            <TextField variant='outlined' name="newCategory" placeholder='Or enter new category here' onChange={handleNewCategoryEnter} />
        </FormControl>         
        <FormControl variant="outlined" sx={{ m: 1, bgcolor: 'background.paper' }}>
            <TextField variant='outlined' name='location' value={editedEvent.location} onChange={handleChange} placeholder="Location" />
        </FormControl>
        <FormControl variant="outlined" sx={{ m: 1, bgcolor: 'background.paper' }}>
            <TextField type='date' variant='outlined' name='date' value={editedEvent.date} onChange={handleChange} />
        </FormControl>        
        <FormControl sx={{ minWidth: 100, mt: 4 }}>
                <Button type="submit" variant="contained" color="success" size="large" onClick={handleSubmit} >{isLoading ? 'Loading...' : 'Save Changes'}</Button>
        </FormControl>
        {errors ? errors.map(error => <Typography key={error} variant="body1" color="error">{error}</Typography>) : null}
    </Box>
  )
}

export default UpdateEventForm