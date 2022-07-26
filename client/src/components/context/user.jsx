import React , { useEffect } from 'react'

// context component 
const UserContext = React.createContext()

// provider component that provides the user object to all components
const UserProvider = ({children}) => {
    const [user, setUser] = React.useState(null)  
     
      useEffect(() => {
        document.title = 'Get together';
        fetch("/api/me").then((r) => {
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