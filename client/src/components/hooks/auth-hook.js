import { useState, useCallback, useEffect } from 'react'

const storageName = 'todoUserStorage'

export const useAuth = () => {
    
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((id, jwtToken) => {
        setUserId(id)
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback((id, jwtToken) => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        
        if (data && data.token) login(data.token, data.userId)
        
    }, [login])

    return { login, logout, token, userId }
}