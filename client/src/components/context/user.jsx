import React , { useEffect } from 'react'

// context component 
const UserContext = React.createContext()

// provider component that provides the user object to all components
const UserProvider = ({children}) => {
    const [user, setUser] = React.useState(null)  
    // const [events, setEvents] = React.useState([])
    const [hostingEvents, setHostingEvents] = React.useState([])
    const [attendingEvents, setAttendingEvents] = React.useState([])    
    // const [categories, setCategories] = React.useState([])

    useEffect(() => {
        document.title = 'Get together';
        fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              setUser(data)
              setHostingEvents(data.hosting_events)
              setAttendingEvents(data.attending_events)
            });
          }
        });
      }, []);
   
   return <UserContext.Provider value = {{user, setUser, hostingEvents, setHostingEvents, attendingEvents, setAttendingEvents}}> {children} </UserContext.Provider>
}

export {UserContext, UserProvider}