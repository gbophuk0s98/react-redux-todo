export default class ProjectService {

    _authBase = '/api/auth'

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
        await this.getResourses(`${this._authBase}/login`, 'POST', { ...body })
    }

    register = async (body, headers = {}) => {
        await this.getResourses(`${this._authBase}/register`, 'POST', { ...body })
    }

    logout = async (body, headers = {}) => {
        await this.getResourses(`${this._authBase}/deleteToken`, 'DELETE', { ...body })
    }

    getToken = async (body, headers = {}) => {
        await this.getResourses(`${this._authBase}/getToken`, 'POST', { ...body })
    }

    getCards = async (body = null, headers = {}) => {
        return await this.getResourses(`${this._authBase}/getCards`, 'GET')
    }

    getTodos = async (body = null, headers = {}) => {
        return await this.getResourses(`${this._authBase}/getTodos`, 'GET')
    }

    createTodo = async (body, headers = {}) => {
        return await this.getResourses(`${this._authBase}/createTodo`, 'POST', { ...body })
    }

    updateTodo = async (body, headers = {}) => {
        return await this.getResourses(`${this._authBase}/updateTodo`, 'PUT', { ...body })
    }

}