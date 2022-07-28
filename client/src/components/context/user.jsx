import React , { useEffect } from 'react'

// context component 
const UserContext = React.createContext()

// provider component that provides the user object to all components
const UserProvider = ({children}) => {
    const [user, setUser] = React.useState(null)  
     
      useEffect(() => {
        document.title = 'Get together';
        fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              setUser(data)
              console.log(data.username, "is logged in")                       
            });
          }else{
            console.log("user is not loggedin")
          }
        });
      }, []);

      
   
   return <UserContext.Provider value = {{user, setUser}}> {children} </UserContext.Provider>
}

export {UserContext, UserProvider}