import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { UserProvider } from './components/context/user.jsx';
import NavBar from './components/Navigation/NavBar';
import Home from './components/Pages/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import MyEvents from './components/Pages/MyEvents';
import EventBrowser from './components/Pages/EventBrowser';
import NewEventForm from './components/Pages/NewEventForm';
import EventPage from './components/Pages/EventPage';

function App() {
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])  
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    fetch('/events')
    .then(r=>r.json())
    .then(events => setEvents(events))

    fetch('/categories')
    .then(r=>r.json())
    .then(categories => setCategories(categories))
  }, [])

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
    if (categoryExist){
      setCategories([...categories, newCategory])
      console.log('added category')
    } else {
      console.log('category already exists')
    }
  }
  
  return (
    <div className="App"> 
      <UserProvider>
        <Router>
          <NavBar />
          {selectedEvent ? <EventPage event={selectedEvent} onSetSelectedEvent={setSelectedEvent} onDeleteEvent={deleteEvent}/> : null}
          <Routes>
            <Route path="/" element={<Home onSetSelectedEvent={setSelectedEvent} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout onSetSelectedEvent={setSelectedEvent} />} />
            <Route path="/myevents" element={<MyEvents events={events} onDeleteEvent={deleteEvent} onUpdateEvents={updateEvents} onSetSelectedEvent={setSelectedEvent} />} />
            <Route path="/events" element ={<EventBrowser events={events} onUpdateEvents={updateEvents} categories={categories} onSetSelectedEvent={setSelectedEvent} />} /> 
            <Route path="/events/new" element={<NewEventForm categories={categories} onAddEvent={addEvent} onAddCategory={addCategory} onSetSelectedEvent={setSelectedEvent}/>} /> 
          </Routes>
        </Router>      
      </UserProvider>          
    </div>
  );
}

export default App;
