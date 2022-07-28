import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {UserContext} from './components/context/user'
import NavBar from './components/Navigation/NavBar';
import Home from './components/Pages/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import MyEvents from './components/Pages/MyEvents';
import EventBrowser from './components/Pages/EventBrowser';
import NewEventForm from './components/Pages/NewEventForm';
import EventPage from './components/Pages/EventPage';
import UpdateEventForm from './components/elements/UpdateEventForm.jsx';


function App() {
  const {user} = useContext(UserContext)  
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])  
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [editEvent, setEditEvent] = useState(false)
  
  useEffect(() => {
    fetch('/events')
    .then(r=>r.json())
    .then(events => setEvents(events))

    fetch('/categories')
    .then(r=>r.json())
    .then(categories => setCategories(categories))
  }, [])

  const getTodayDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0
    let yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    return today
  }

  const today = getTodayDate()  

  const updateEvents = (updatedEvent) => {
    const newList = events.map(event => {
      if (event.id === updatedEvent.id) {
        return updatedEvent
      } else {
        return event
      }
    })
    setEvents(newList)
  }

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent])
  }

  const deleteEvent = (id) => {
    const newList = events.filter(event => event.id !== id)
    setEvents(newList)
  }

  const addCategory = (newCategory) => {
    const categoryExist = categories.filter(category => category.id === newCategory.id)
    if (!categoryExist){
      setCategories([...categories, newCategory])
      console.log('added category')
    }
    console.log('category already exists')
  }
  
  return (    
    <div >      
        <Router>          
          <NavBar />
          {editEvent ? <UpdateEventForm event={selectedEvent} categories={categories} onAddCategory={addCategory} onUpdateEvents={updateEvents} setEditEvent={setEditEvent} onSetSelectedEvent={setSelectedEvent}/> : null}
          {selectedEvent && !editEvent ? <EventPage event={selectedEvent} today={today} setEditEvent={setEditEvent} onSetSelectedEvent={setSelectedEvent} onDeleteEvent={deleteEvent} onUpdateEvents={updateEvents}/> : null}
          <Routes>
            <Route path="/" element={<Home onSetSelectedEvent={setSelectedEvent} events={events} today={today}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout onSetSelectedEvent={setSelectedEvent} />} />
            <Route path="/myevents" element={<MyEvents events={events} today={today} onDeleteEvent={deleteEvent} onUpdateEvents={updateEvents} onSetSelectedEvent={setSelectedEvent} setEditEvent={setEditEvent}/>} />
            <Route path="/events" element ={<EventBrowser events={events} today={today} onUpdateEvents={updateEvents} categories={categories} onSetSelectedEvent={setSelectedEvent} />} /> 
            <Route path="/events/new" element={<NewEventForm categories={categories} onAddEvent={addEvent} onAddCategory={addCategory} onSetSelectedEvent={setSelectedEvent}/>} /> 
          </Routes>
        </Router>     
    </div>
    
  );
}

export default App;
