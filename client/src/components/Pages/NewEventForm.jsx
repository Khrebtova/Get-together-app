import React, { useState, useContext, useEffect } from 'react'
import { headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'

const NewEventForm = ({categories, onAddEvent, onAddCategory, onSetSelectedEvent}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isNewCategory, setIsNewCategory] = useState(false)
   
    useEffect(() => {
        onSetSelectedEvent(null)
      } , [onSetSelectedEvent])

    const defaultData = {
        name: '',
        description: '',
        location: '',
        date: '',
        categoryId: '',
        newCategory: ''
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
        }}

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
                    console.log("event added", event)
                    onAddCategory(event.category)
                    navigate('/myevents')
                })
            }else{
                res.json().then(err => setErrors(err.errors))
            }})      
    }

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
        <h2>{user.username}, create New Event here: </h2>
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" placeholder='enter name here' onChange={handleChange}/>
            <label htmlFor="categoryId">Choose category: </label>
            <select name="categoryId" id="categoryId" onChange={handleChange} disabled={isNewCategory}>
                <option value="">Choose category</option>
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <label htmlFor="newCategory">Or enter new category: </label>
            <input type="text" name="newCategory" id="newCategory" placeholder='enter new category here' onChange={handleNewCategoryEnter}/>
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