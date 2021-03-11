export default class ProjectService {

    _authBase = '/api/auth'
    _todoBase = '/api/todo'

    async getResourses(url, method = 'GET', body = null, headers = {}){
        try
        {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || 'Что-то пошло не так')
            return data
        }
        catch (e) { throw e }
    }

    login = async (body, headers = {}) => {
        return await this.getResourses(`${this._authBase}/login`, 'POST', { ...body })
    }

    register = async (body, headers = {}) => {
        return await this.getResourses(`${this._authBase}/register`, 'POST', { ...body })
    }

    logout = async (body, headers = {}) => {
        await this.getResourses(`${this._authBase}/deleteToken`, 'DELETE', { ...body })
    }

    getToken = async (body, headers = {}) => {
        await this.getResourses(`${this._authBase}/getToken`, 'POST', { ...body })
    }

    getCards = async (body = null) => {
        const headers = { Project: `Id ${body}` }
        return await this.getResourses(`${this._todoBase}/getCards`, 'GET', null, headers)
    }

    updateCardItem = async (body, headers = {}) => {
        await this.getResourses(`${this._todoBase}/updateCards`, 'PUT',  { ...body })
    }

    getTodos = async (headersToBackend = null) => {
        const headers = { Project: `Id ${headersToBackend}` }
        return await this.getResourses(`${this._todoBase}/getTodos`, 'GET', null, headers)
    }

    getTodo = async (headersToBackend = null) => {
        const headers = { Todo: `Id ${headersToBackend}`}
        return await this.getResourses(`${this._todoBase}/getTodo`, 'GET', null, headers)
    }

    createTodo = async (body, headersToBackend = null) => {
        const headers = { Project: `Id ${headersToBackend}` }
        return await this.getResourses(`${this._todoBase}/createTodo`, 'POST', { ...body }, headers)
    }

    updateTodo = async (body, headers = {}) => {
        return await this.getResourses(`${this._todoBase}/updateTodo`, 'PUT', { ...body })
    }
    
    updateTodoColor = async (body, headers = {}) => {
        await this.getResourses(`${this._todoBase}/updateTodoColor`, 'PUT', { ...body })
    }

    updateTodoTitle = async(body, headers = {}) => {
        await this.getResourses(`${this._todoBase}/updateTodoTitle`, 'PUT', { ...body })
    }

    updateTodoPriority = async(body, headers = {}) => {
        await this.getResourses(`${this._todoBase}/updateTodoPriority`, 'PUT', { ...body })
    }

    saveCards = async (body, headers = {}) => {
        await this.getResourses(`${this._todoBase}/saveCards`, 'POST', { ...body })
    }

    createProject = async (body, headers = {}) => {
        return await this.getResourses(`${this._todoBase}/createProject`, 'POST', { ...body })
    }

    getProjects = async (body = null) => {
        const headers = { User: `Id ${body}` }
        return await this.getResourses(`${this._todoBase}/getProjects`, 'GET', null, headers)
    } 

}