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
    console.log('logoutHandler')
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

const createProject = (dispatch, project) => {
    service.createProject(project).then(res => dispatch(setProject(res)))
    return {
        type: 'USER_PROJECT_CREATED',
    }
}

const setProject = (project) => {
    return {
        type: 'PROJECT_CREATED_SUCCESS',
        payload: project, 
    }
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

const todoCreated = (dispatch, todo) => {
    service.createTodo(todo).then(res => fetchTodos(dispatch))
    return {
        type: 'TODO_CREATED',
    }
}

const todoUpdate = (dispatch, todo) => {
    service.updateTodo(todo)
    return {
        type: 'TODO_UPDATED'
    }
}

const fetchTodos = (dispatch) => {
    dispatch(todosRequested())
    service.getTodos()
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
    todoUpdate,
    saveCards,
    clearAuthError,
    createProject
}