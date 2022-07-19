import React, { useState } from 'react'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'

const NewEventForm = ({user}) => {
    
    const navigate = useNavigate()

    const defaultData = {
        name: '',
        description: '',
        location: '',
        date: '',
        category: ''
    }
    const [newEvent, setNewEvent] = useState(defaultData)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitting", {newEvent})
        setIsLoading(true)
        const strongParams = {
            user_id: user.id,
            name: newEvent.name,
            description: newEvent.description,
            location: newEvent.location,
            date: newEvent.date,
            category_attributes: {name: newEvent.category}
        }
        
        fetch('/events', {
            method: 'POST',
            headers,
            body: JSON.stringify(strongParams)
        })
        .then(res => {
            setIsLoading(false)
            if (res.ok) {
                res.json().then(event => {
                    console.log("created ", event.name, 'with id: ', event.id)
                    navigate('/myevents')
                })
            }else{
                res.json().then(err => setErrors(err.errors))
            }})      
    }

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
        <h2>New Event Form</h2>
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" placeholder='enter name here' onChange={handleChange}/>
            <label htmlFor="category">Category: </label>
            <input type="text" name="category" id="category" placeholder='enter new category here' onChange={handleChange}/>
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" id="description" placeholder='enter description here' onChange={handleChange}/>
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" id="date" placeholder='choose date' onChange={handleChange}/>
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" id="location" placeholder='enter location here' onChange={handleChange}/>
            <button type="submit" >{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>
        {errors ? errors.map((err) => (<p style={{color: 'red'}} key={err}>{err}</p>)) : null}
    </div>
  )
}

export default NewEventForm