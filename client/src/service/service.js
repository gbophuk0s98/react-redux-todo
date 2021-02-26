export default class ProjectService {

    _authBase = '/api/auth'

    async getResourses(url, method = 'GET', body = null, headers = {}){
        try
        {
            // if (body) {
            //     body = JSON.stringify(body)
            //     headers['Content-Type'] = 'application/json'
            // }
            console.log(url, method, body)

            const response = await fetch(url, { method, body, headers })
            console.log('response', response)
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || 'Что-то пошло не так')
            return data
        }
        catch (e) { throw e }
    }

    login = async (body, headers = {}) => {
        await this.getResourses(`${this._authBase}/login`, 'POST', { ...body })
    }
}