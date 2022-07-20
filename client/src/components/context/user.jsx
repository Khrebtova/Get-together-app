import React , { useEffect } from 'react'

// context component 
const UserContext = React.createContext()

// provider component that provides the user object to all components
const UserProvider = ({children}) => {
    const [user, setUser] = React.useState(null)  
    // const [events, setEvents] = React.useState([])
    // const [hostEvents, setHostEvents] = React.useState([])
    // const [guestEvents, setGuestEvents] = React.useState([])    
    // const [categories, setCategories] = React.useState([])

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
   
   return <UserContext.Provider value = {{user, setUser}}> {children} </UserContext.Provider>
}

export {UserContext, UserProvider}