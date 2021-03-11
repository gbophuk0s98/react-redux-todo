import { validateAuthForm, validateRegForm, isEmptyObject } from '../validation'
import ProjectService from '../service'

const service = new ProjectService()

const registerHandler = (dispatch, form) => {

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

const loginHandler = (dispatch, form) => {
    
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
    console.log('success', project)
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
    console.log('createProject', project)
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

const todoCreated = (dispatch, todo, projectId) => {
    service.createTodo(todo, projectId).then(() => fetchTodos(dispatch, projectId))
    return {
        type: 'TODO_CREATED',
    }
}

const todoDateUpdate = (dispatch, todo, projectId) => {
    service.updateTodo(todo)
    .then(() => fetchTodos(dispatch, projectId))
    return {
        type: 'TODO_UPDATED'
    }
}

const todoTitleUpdate = (dispatch, id, title, projectId) => {
    service.updateTodoTitle({ id, title })
        .then(() => service.updateCardItem({ id, title }))
        .then(() => todoSelected(dispatch, id))
        .then(() => fetchTodos(dispatch, projectId))
    return { type: 'TODO_UPDATED' }
}

const todoColorUpdate = (dispatch, id, color, projectId) => {
    service.updateTodoColor({ id, color })
        .then(() => service.updateCardItem({ id, color }))
        .then(() => todoSelected(dispatch, id))
        .then(() => fetchTodos(dispatch, projectId))
    return { type: 'TODO_UPDATED' }
}

const todoPriorityUpdate = (dispatch, id, priority, projectId) => {
    console.log('id', id)
    service.updateTodoPriority({ id, priority })
        .then(() => service.updateCardItem({ id, priority }))
        .then(() => todoSelected(dispatch, id))
        .then(() => fetchTodos(dispatch, projectId))
    return { type: 'TODO_UPDATED' }
}

const todoSelected = (dispatch, id) => {
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
    todoDateUpdate,
    saveCards,
    clearAuthError,
    createProject,
    fetchProjects,
    todoSelected,
    todoColorUpdate,
    todoTitleUpdate,
    todoPriorityUpdate,
}