import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    projectId: null,
    login: noop,
    logout: noop,
    addProject: noop,
})