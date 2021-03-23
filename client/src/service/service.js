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

    getCards = async (headers = {}) => {
        return await this.getResourses(`${this._todoBase}/getCards`, 'GET', null, headers)
    }

    updateCardItem = async (body, headers = {}) => {
        await this.getResourses(`${this._todoBase}/updateCards`, 'PUT',  { ...body }, headers)
    }

    getTodos = async (headers = {}) => {
        return await this.getResourses(`${this._todoBase}/getTodos`, 'GET', null, headers)
    }

    getTodo = async (headers = {}) => {
        return await this.getResourses(`${this._todoBase}/getTodo`, 'GET', null, headers)
    }

    createTodo = async (body, headers = {}) => {
        return await this.getResourses(`${this._todoBase}/createTodo`, 'POST', { ...body }, headers)
    }

    updateCardTitle = async (body, headers = null) => {
        return await this.getResourses(`${this._todoBase}/updateCardTitle`, 'PUT', { ...body }, headers)
    }

    updateTodo = async (body, headers = {}) => {
        return await this.getResourses(`${this._todoBase}/updateTodo`, 'PUT', { ...body }, headers)
    }
    
    saveCards = async (body = null, headers = {}) => {
        await this.getResourses(`${this._todoBase}/saveCards`, 'POST', { ...body }, headers)
    }
    
    createCard = async (body = null, headers = {}) => {
        await this.getResourses(`${this._todoBase}/createCard`, 'POST', { ...body }, headers)
    }

    deleteCard = async (body = null, headers = {}) => {
        await this.getResourses(`${this._todoBase}/deleteCard`, 'DELETE', { ...body }, headers)
    }

    createProject = async (body, headers = {}) => {
        return await this.getResourses(`${this._todoBase}/createProject`, 'POST', { ...body }, headers)
    }

    getProjects = async (headers = {}) => {
        return await this.getResourses(`${this._todoBase}/getProjects`, 'GET', null, headers)
    } 

    getProject = async (headers = {}) => {
        return await this.getResourses(`${this._todoBase}/getProject`, 'GET', null, headers)
    }

    updateProjectItems = async (body = null, headers = {}) => {
        return await this.getResourses(`${this._todoBase}/updateProjectItems`, 'PUT', { ...body }, headers)
    }

}