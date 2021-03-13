import { validateAuthForm, validateRegForm, isEmptyObject } from '../validation'
import ProjectService from '../service'

const service = new ProjectService()

const registerHandler = (dispatch, form) => {

    dispatch(sendAuthForm())
    const errors = validateRegForm(form)
    
    if (!isEmptyObject(errors)) {
        return {
            type: 'REGISTER_FORM_ERROR',
            payload: errors
        }
    }
    service.register(form)
    .then(user => dispatch(setUser(user)) )
    .catch(error => dispatch(setUserError(error.message)) )
    return {
        type: 'REGISTER_FORM_SUBMITED',
        payload: form
    }
}

const sendAuthForm = () => {
    return {
        type: 'CLIENT_FORM_SENDING'
    }
}

const loginHandler = (dispatch, form) => {
    
    dispatch(sendAuthForm())

    const errors = validateAuthForm(form)

    if (!isEmptyObject(errors)) {
        return {
            type: 'LOGIN_FORM_ERROR',
            payload: errors
        }
    }
    service.login(form)
    .then(user => dispatch(setUser(user)))
    .catch(error => dispatch(setUserError(error.message)) )
    return {
        type: 'LOGIN_FORM_SUBMITED',
        payload: form
    }
}

const logoutHandler = () => {
    return {
        type: 'USER_LOGOUT_SUCCESS'
    }
}

const setUser = user => {
    return {
        type: 'USER_CREATED_SUCCESS',
        payload: user,
    }
}

const setUserError = error => {
    return {
        type: 'USER_CREATED_FAILURE',
        payload: error
    }
}

const clearAuthError = () => {
    return {
        type: 'AUTH_ERROR_CLEAR'
    }
}

const createProjectRequested = () => {
    return {
        type: 'CREATE_PROJECT_REQUESTED'
    }
}

const createProjectSuccess = (project) => {
    return {
        type: 'CREATE_PROJECT_SUCCESS',
        payload: project
    }
}

const createProjectFailure = (error) => {
    return {
        type: 'CREATE_PROJECT_FAILURE',
        payload: error
    }
}

const createProject = (dispatch, project) => {
    dispatch(createProjectRequested())
    service.createProject(project)
    .then(res => dispatch(createProjectSuccess(res)) )
    .catch(error => dispatch(createProjectFailure(error)) )
}

const projectsRequested = () => {
    return {
        type: 'FETCH_PROJECTS_REQUEST'
    }
}

const projectsError = error => {
    return {
        type: 'FETCH_PROJECTS_FAILURE',
        payload: error
    }
}

const projectsLoaded = projects => {
    return {
        type: 'FETCH_PROJECTS_SUCCESS',
        payload: projects
    }
}

const fetchProjects = (dispatch, userId) => {
    dispatch(projectsRequested())
    service.getProjects(userId)
    .then(projects => dispatch(projectsLoaded(projects)) )
    .catch(error => dispatch(projectsError(error)) )
}

const setProject = project => {
    return {
        type: 'FETCH_PROJECT_SUCCESS',
        payload: project
    }
}

const fetchProject = (dispatch, projectId) => {
    service.getProject(projectId)
    .then(project => dispatch(setProject(project)))
}

const cardsRequested = () => {
    return {
        type: 'FETCH_CARDS_REQUEST',
    }
}

const cardsError = error => {
    return {
        type: 'FETCH_CARDS_FAILURE',
        payload: error
    }
}

const cardsLoaded = newCards => {
    return {
        type: 'FETCH_CARDS_SUCCESS',
        payload: newCards
    }
}

const fetchCards = (dispatch, projectId) => {
    dispatch(cardsRequested())
    service.getCards(projectId)
        .then(data => dispatch(cardsLoaded(data)))
        .catch(err => dispatch(cardsError(err)))
}

const todosRequested = () => {
    return {
        type: 'FETCH_TODOS_REQUEST'
    }
}

const todosError = error => {
    return {
        type: 'FETCH_TODOS_FAILURE',
        payload: error
    }
}

const todosLoaded = todos => {
    return {
        type: 'FETCH_TODOS_SUCCESS',
        payload: todos
    }
}

const todoSelectedLoading = () => {
    return {
        type: 'SELECTED_TODO_LOADING'
    }
}

const todoCreated = (dispatch, todo, projectId) => {
    service.createTodo(todo, projectId)
    .then(todo => todoSelected(dispatch, todo._id))
    .then(() => fetchCards(dispatch, projectId))
    .then(() => fetchTodos(dispatch, projectId))

    return { type: 'TODO_CREATED' }
}

const todoUpdate = (dispatch, id, projectId, startDate = null, endDate = null, color = null, title = null, priority = null) => {
    let objToUpdate = {}

    if (startDate && endDate) objToUpdate = { id, startDate, endDate }
    else if (color) objToUpdate = { id, color }
    else if (title) objToUpdate = { id, title }
    else if (priority) objToUpdate = { id, priority }

    service.updateTodo(objToUpdate)
    .then(() => service.updateCardItem(objToUpdate))
    .then(() => todoSelected(dispatch, id))
    .then(() => fetchTodos(dispatch, projectId))
    .then(() => fetchCards(dispatch, projectId))
        
    return { type: 'TODO_UPDATED' }
}

const todoSelected = (dispatch, id) => {
    dispatch(todoSelectedLoading())
    service.getTodo(id)
    .then(todo => dispatch({ type: 'TODO_SELECTED', payload: todo }) )
}

const fetchTodos = (dispatch, projectId) => {
    dispatch(todosRequested())
    service.getTodos(projectId)
        .then(data => dispatch(todosLoaded(data)))
        .catch(err => dispatch(todosError(err)))
}

const transferCardsItems = (result) => {
    return {
        type: 'TRANSFER_CARDS_ITEMS',
        payload: result
    }
}

const saveCards = (cards) => {
    service.saveCards(cards)
    return {
        type: 'CARDS_SAVED'
    }
}

const changeForm = event => {
    return {
        type: 'FORM_CHANGED',
        payload: event,
    }
}

const clearErrors = () => {
    return {
        type: 'CLEAR_FORM_ERRORS'
    }
}

const setRecentProjects = (dispatch, projectId) => {
    service.getProject(projectId)
    .then(project => dispatch({ type: 'USER_RECENT_PROJECTS', payload: project }))
}

export {
    fetchCards,
    transferCardsItems,
    changeForm,
    registerHandler,
    loginHandler,
    logoutHandler,
    clearErrors,
    fetchTodos,
    todoCreated,
    saveCards,
    clearAuthError,
    createProject,
    fetchProjects,
    todoSelected,
    todoUpdate,
    fetchProject,
    setRecentProjects,
}