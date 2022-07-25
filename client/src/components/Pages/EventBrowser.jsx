import React, { useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/user'
import Event from '../elements/Event'

const EventBrowser = ({events, onUpdateEvents, categories, onSetSelectedEvent}) => {
  const {user} = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  
  useEffect(() => {
    onSetSelectedEvent(null)
  } , [onSetSelectedEvent]) 
  
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
    <div>      
        <h2>EventBrowser</h2>
        <input type="text" placeholder=' 🔍 SEARCH' onChange={(e)=>setSearch(e.target.value.toLowerCase())} value={search}/>
        <select onChange={(e)=>setCategoryFilter(e.target.value)} >
          <option value=''>All</option>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <button onClick={handleResetFilters}> Reset all filters</button>
        <div style={{display: "flex", justifyContent: 'space-around', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
          {eventList.length > 0 ? displayEvents : <p>Nothing was found, change filters</p>}
        </div>       
    </div>
  )
}

export default EventBrowser