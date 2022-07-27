import React, { useState, useContext, useEffect } from 'react'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Divider } from '@mui/material'

const NewEventForm = ({categories, onAddEvent, onAddCategory, onSetSelectedEvent}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const defaultData = {
        name: '',
        description: '',
        location: '',
        date: '',
        categoryId: '',
        newCategory: ''
    }
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [newEvent, setNewEvent] = useState(defaultData)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        onSetSelectedEvent(null)
      } , [onSetSelectedEvent])
    
    if (!user) return <p>Please log in to create new events</p>

    const handleChange = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        })
    }

    const handleNewCategoryEnter = (e) => {
        if (e.target.value === '') {
            setIsNewCategory(false)            
        } else {
            setIsNewCategory(true)
            setNewEvent({
                ...newEvent,
                newCategory: e.target.value, 
                categoryId: ''
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitting", {newEvent})
        setIsLoading(true)
        let strongParams;
        if (isNewCategory) {
            strongParams = {
                user_id: user.id,
                name: newEvent.name,
                description: newEvent.description,
                location: newEvent.location,
                date: newEvent.date,
                category_attributes: {name: newEvent.newCategory}
            }} else {
            strongParams = {
                user_id: user.id,
                category_id: newEvent.categoryId,
                name: newEvent.name,
                description: newEvent.description,
                location: newEvent.location,
                date: newEvent.date,
            }}        
        console.log(strongParams)
        fetch('/events', {
            method: 'POST',
            headers,
            body: JSON.stringify(strongParams)
        })
        .then(res => {
            setIsLoading(false)
            if (res.ok) {
                res.json().then(event => {                    
                    onAddEvent(event)
                    console.log("event added")
                    onAddCategory(event.category)
                    navigate('/myevents')
                })
            }else{
                res.json().then(err => setErrors(err.errors))
            }})      
    }
   
    return (   
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 1, mt: 10, ml: 20, mr: 20}}>
            <Typography variant="h3" mb={2} mt={2} >
                Create New Event here: 
            </Typography>

            <Divider />
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#f3c460'}}>
            <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2, ml: 2, mr: 2, bgcolor: 'white' }}>                
                <TextField variant='outlined' name='name' value={newEvent.name} onChange={handleChange} placeholder="Name"/>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2, ml: 2, mr: 2, bgcolor: 'white' }}>                
                <TextField variant='outlined' name='description' value={newEvent.description} onChange={handleChange} placeholder="Description" />
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2, ml: 2, mr: 2, bgcolor: 'white'  }}>
                <InputLabel >Select Category</InputLabel>
                <Select name="categoryId"  onChange={handleChange} disabled={isNewCategory} value={newEvent.categoryId}>                  
                {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2, ml: 2, mr: 2, bgcolor: 'white'  }}>
                <TextField variant='outlined' name="newCategory" placeholder='enter new category here' onChange={handleNewCategoryEnter} />
            </FormControl>         
            <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2, ml: 2, mr: 2, bgcolor: 'white'  }}>
                <TextField variant='outlined' name='location' value={newEvent.location} onChange={handleChange} placeholder="Location" />
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 100, mt: 2, ml: 2, mr: 2, bgcolor: 'white'  }}>
                <TextField type='date' variant='outlined' name='date' value={newEvent.date} onChange={handleChange} />
            </FormControl>
            <FormControl sx={{ minWidth: 100, mt: 4 }}>
                <Button type="submit" variant="contained" color="secondary" size="large" onClick={handleSubmit} >{isLoading ? 'Loading...' : 'Save Event'}</Button>
            </FormControl>
            </Box>
            {errors ? errors.map(error => <Typography key={error} variant="body1" color="error">{error}</Typography>) : null}
        </Box>
    )
}

export default NewEventForm