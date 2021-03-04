import { useState, useEffect, useCallback } from 'react'

const storageName = 'todoUserStorage'

export const useAuth = () => {
    
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const data = JSON.stringify(localStorage.getItem(storageName))
        if (data && data.token) login(data.token, data.userId)
    }, [login])

    const login = useCallback((jwtToken, id) => {
        setUserId(id)
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback((jwtToken, id) => {
        setUserId(null)
        setToken(null)

        localStorage.removeItem(storageName)
    }, [])

    return { login, logout, token, userId }
}