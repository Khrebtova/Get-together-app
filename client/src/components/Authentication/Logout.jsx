import React , {useContext, useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../context/user'

const Logout = ({onSetSelectedEvent}) => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        onSetSelectedEvent(null)
    } , [])
    
    const handleLogout = () => {        
        fetch('/logout', {
            method: "DELETE"
        })
        .then(() => {            
            setUser(null)                
            navigate('/login')
            }
        )        
    }
    
    if (!user) return <h2>You are not logged in</h2>
    
    return (
        <div>
            <h2>Are you sure you want to log out, {user.username}? </h2>
            <button style={{width: 'auto', height: '40px', fontSize: 'calc(20px)'}} onClick={handleLogout}>YES! Log out</button>
            <button style={{width: 'auto', height: '40px', fontSize: 'calc(20px)'}} onClick={() => navigate('/')}>NO! Stay logged in</button>
        </div>
    )
}

export default Logout