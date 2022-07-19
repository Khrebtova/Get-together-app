import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/Pages/Home';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import MyEvents from './components/Pages/MyEvents';
import { backendUrl } from './Globals';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = 'Get together';
    fetch(backendUrl + "/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data)
        console.log(data)});
      }
    });
  }, []);

  console.log(user)

  return (
    <div className="App">           
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/signup" element={<Signup onLogin={setUser}/>} />
            <Route path="/login" element={<Login onLogin={setUser}/>} />
            <Route path="/logout" element={<Logout onLogout={setUser}/>} />
            <Route path="/myevents" element={<MyEvents user={user}/>} />
          </Routes>
        </Router>      
    </div>
  );
}

export default App;
