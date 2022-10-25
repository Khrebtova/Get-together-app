import React, { useState, useContext, useEffect } from 'react'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Divider } from '@mui/material'
import { LoginBox , LoginForm, LoginButton, TextInput } from '../Authentication/Styles';

const NewEventFormControl = styled(FormControl)({    
    minWidth: 100, 
    marginRight: 20, 
    marginLeft: 20, 
    marginTop: 20, 
    backgroundColor: 'white' 
})

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
    
    if (!user) return <Typography variant="h4" m={15} onClick={()=>navigate('/login')}>Please <a href="/login">Login</a></Typography>

    const handleChange = (e) => {
        setNewEvent({...newEvent, [e.target.name]: e.target.value})
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
        fetch('/api/events', {
            method: 'POST',
            headers,
            body: JSON.stringify(strongParams)
        })
        .then(res => {
            setIsLoading(false)
            if (res.ok) {
                res.json().then(event => {                    
                    onAddEvent(event)                    
                    onAddCategory(event.category)
                    navigate('/my-events')
                })
            }else{
                res.json().then(err => setErrors(err.errors))
            }})      
    }
   
    return (   
        <Box className='newEvent'                 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center'
            }} 
        >        
            <LoginBox bgcolor='#D9CAB3'>
                <Typography variant="h4" fontWeight='bold' mb='10px'>
                    Create New Event 
                </Typography>
                <Divider />
                <LoginForm >                
                    <TextField variant='outlined' color='success' name='name' value={newEvent.name} onChange={handleChange} placeholder="Name"/>
                </LoginForm>
                <LoginForm >                
                    <TextField variant='outlined' color='success' name='description' value={newEvent.description} onChange={handleChange} placeholder="Description" />
                </LoginForm>
                <LoginForm>
                    <InputLabel color='success'>Select Category</InputLabel>
                    <Select name="categoryId"  color='success' onChange={handleChange} disabled={isNewCategory} value={newEvent.categoryId}>                  
                    {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                    </Select>
                </LoginForm>
                <LoginForm>
                    <TextField variant='outlined' name="newCategory" color='success' placeholder='enter new category here' onChange={handleNewCategoryEnter} />
                </LoginForm>         
                <LoginForm>
                    <TextField variant='outlined' color='success' name='location' value={newEvent.location} onChange={handleChange} placeholder="Location" />
                </LoginForm>
                <LoginForm>
                    <TextField type='date' variant='outlined' color='success' name='date' value={newEvent.date} onChange={handleChange} />
                </LoginForm>
                <LoginForm sx={{ minWidth: 100, mt: 4 }}>
                    <LoginButton type="submit" variant="contained" onClick={handleSubmit} >{isLoading ? 'Loading...' : 'Save Event'}</LoginButton>
                </LoginForm>
            </LoginBox>
            {errors ? errors.map(error => <Typography key={error} variant="body1" color="error">{error}</Typography>) : null}
        </Box>
    )
}

export default NewEventForm