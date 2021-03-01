import { useState, useCallback, useEffect } from 'react'
import ProjectService from '../service'

const storageName = 'userData'

export const useAuth = () => {
    
    const service = new ProjectService()
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        console.log(data)
        // service.getToken()
    }, [])

    const login = useCallback((jwtToken, id) => {
        setUserId(id)
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback((jwtToken, id) => {
        service.logout({ id })
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    return { login, logout }
}