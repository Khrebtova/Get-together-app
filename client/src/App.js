import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavBar from './components/Navigation/NavBar';
import Home from './components/Pages/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import MyEvents from './components/Pages/MyEvents';
import EventBrowser from './components/Pages/EventBrowser';
import NewEventForm from './components/Pages/NewEventForm';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = 'Get together';
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data)
        });
      }
    });
  }, []);

  console.log(user)

  return (
    <div className="App">           
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/signup" element={<Signup onLogin={setUser}/>} />
            <Route path="/login" element={<Login onLogin={setUser}/>} />
            <Route path="/logout" element={<Logout onLogout={setUser}/>} />
            <Route path="/myevents" element={<MyEvents user={user}/>} />
            <Route path="/events" element ={<EventBrowser />} />
            <Route path="/events/new" element={<NewEventForm user={user}/>} />
          </Routes>
        </Router>      
    </div>
  );
}

export default App;
