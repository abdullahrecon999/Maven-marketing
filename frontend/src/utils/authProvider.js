import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("user Auth Provider called", user)
        if(user) return
        const fetchUserAuth = async () => {
            try {
              setLoading(true)
              const res = await axios.get("http://localhost:3000/users/user", { withCredentials: true })
              console.log("res", res.data)
              localStorage.setItem('user', JSON.stringify(res.data))
              if (!res.statusText === 'ok') return setLoading(false)
      
              setUser(res.data)
              setLoading(false)
            } catch (error) {
              setLoading(false)
              console.error('There was an error fetch auth', error)
              return
            }
          }
          fetchUserAuth()
    }, [])

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}