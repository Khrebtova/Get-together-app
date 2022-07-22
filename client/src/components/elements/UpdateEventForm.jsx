import React , { useState } from 'react'

import { headers } from '../../Globals'

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
        setEditedEvent({
            ...editedEvent,
            [e.target.name]: e.target.value
        })
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
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
        <h4>Edit Event</h4>
        <button onClick={()=>setEditEvent(false)}>CANCEL</button>
        {errors ? errors.map((err) => (<p style={{color: 'red'}} key={err}>{err}</p>)) : null}
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" placeholder='enter name here' onChange={handleChange} value={editedEvent.name}/>
            <label htmlFor="categoryId">Choose category: </label>
            <select name="categoryId" id="categoryId" onChange={handleChange} disabled={isNewCategory} value={editedEvent.category_id}>
                <option value="">Choose category</option>
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <label htmlFor="newCategory">Or enter new category: </label>
            <input type="text" name="newCategory" id="newCategory" placeholder='enter new category here' onChange={handleNewCategoryEnter}/>
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" id="description" placeholder='enter description here' onChange={handleChange} value={editedEvent.description}/>
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" id="date" placeholder='choose date' onChange={handleChange} value={editedEvent.date}/>
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" id="location" placeholder='enter location here' onChange={handleChange} value={editedEvent.location}/>
            <button type="submit" >{isLoading ? 'Loading...' : 'Submit'}</button>
        </form>
    </div>
  )
}

export default UpdateEventForm