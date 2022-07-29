import React , { useState } from 'react'
import { headers } from '../../Globals'
import { styled } from '@mui/material/styles';
import {Box, TextField, Button, Select, MenuItem, FormControl, Typography} from '@mui/material'

const NewEventFormControl = styled(FormControl)({    
    minWidth: 100, 
    marginRight: 100, 
    marginLeft: 100, 
    marginTop: 2, 
    backgroundColor: 'white' 
})

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
        
        fetch(`/api/events/${event.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(strongParams)
        })
        .then(res => {
            setIsLoading(false)
            if (res.ok) {
                res.json().then(event => {                    
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
    <Box mt={9} sx={{width: '100%', display: 'flex', position: 'relative', flexDirection: 'column', bgcolor: '#dddedf'}}>
        <NewEventFormControl>                      
            <TextField variant='outlined' size="small" name='name' value={editedEvent.name} onChange={handleChange} placeholder="Name"/>
        </NewEventFormControl>
        <NewEventFormControl>                
            <TextField variant='outlined' size="small" name='description' value={editedEvent.description} onChange={handleChange} placeholder="Description" />
        </NewEventFormControl>
        <NewEventFormControl>           
            <Select name="category_id"  onChange={handleChange} disabled={isNewCategory} size="small" value={editedEvent.category_id}>                  
                {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
            </Select>
        </NewEventFormControl>
        <NewEventFormControl>
            <TextField variant='outlined' size="small" name="newCategory" placeholder='Or enter new category here' onChange={handleNewCategoryEnter} />
        </NewEventFormControl>         
        <NewEventFormControl>
            <TextField variant='outlined' size="small" name='location' value={editedEvent.location} onChange={handleChange} placeholder="Location" />
        </NewEventFormControl>
        <NewEventFormControl>
            <TextField type='date' size="small" variant='outlined' name='date' value={editedEvent.date} onChange={handleChange} />
        </NewEventFormControl>        
        <FormControl sx={{ minWidth: 100, mt: 4, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button variant="contained" color="error" mb={2} mt={2} onClick={() => {setEditEvent(false); onSetSelectedEvent(null)}}> CANCEL </Button>
            <Button type="submit" variant="contained" color="success" size="large" onClick={handleSubmit} >{isLoading ? 'Loading...' : 'Save Changes'}</Button>
        </FormControl>
        {errors ? errors.map(error => <Typography key={error} variant="body1" color="error">{error}</Typography>) : null}
    </Box>
  )
}

export default UpdateEventForm