import { useState, useCallback, useEffect } from 'react'

const storageName = 'todoUserStorage'

export const useAuth = () => {
    
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [projectId, setProjectId] = useState(null)

    const login = useCallback((id, jwtToken, projectId) => {
        setUserId(id)
        setToken(jwtToken)
        setProjectId(projectId)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id, projectId: projectId
        }))
    }, [])

    const logout = useCallback((id, jwtToken) => {
        setToken(null)
        setUserId(null)
        setProjectId(null)
        localStorage.removeItem(storageName)
    }, [])

    const addProject = useCallback((id, jwtToken, project) => {
        setUserId(id)
        setToken(jwtToken)
        setProjectId(project)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id, projectId: project
        }))
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) login(data.userId, data.token, data.projectId)
        
    }, [login])

    return { login, logout, addProject, token, userId, projectId }
}