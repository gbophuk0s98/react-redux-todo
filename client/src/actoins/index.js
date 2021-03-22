import { validateAuthForm, validateRegForm, isEmptyObject } from '../validation'
import ProjectService from '../service'

const service = new ProjectService()

const registerHandler = (form) => (dispatch) => {

    dispatch(sendAuthForm())
    const errors = validateRegForm(form)
    
    if (!isEmptyObject(errors)) {
        dispatch({
            type: 'REGISTER_FORM_ERROR',
            payload: errors
        })
    }
    service.register(form)
    .then(user => dispatch(setUser(user)) )
    .then(() => dispatch({ type: 'REGISTER_FORM_SUBMITED', payload: form }))
    .catch(error => dispatch(setUserError(error.message)) )
}

const sendAuthForm = () => {
    return {
        type: 'CLIENT_FORM_SENDING'
    }
}

const loginHandler = (form) => (dispatch) => {
    
    dispatch(sendAuthForm())

    const errors = validateAuthForm(form)

    if (!isEmptyObject(errors)) {
        dispatch({
            type: 'LOGIN_FORM_ERROR',
            payload: errors
        })
    }
    service.login(form)
    .then(user => dispatch(setUser(user)))
    .then(() => dispatch({ type: 'LOGIN_FORM_SUBMITED', payload: form }))
    .catch(error => dispatch(setUserError(error.message)) )
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
        type: 'USER_AUTHENTICATION_FAILURE',
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

const createProject = (project) => (dispatch) => {
    dispatch(createProjectRequested())
    service.createProject(project)
    .then(res => {
        dispatch(createProjectSuccess(res)) 
        dispatch(setProject(res))
        dispatch(setRecentProjects(res._id))
    })
    .catch(error => dispatch(createProjectFailure(error)) )
}

const createCard = (objToBackend) => (dispatch) => {
    service.createCard(objToBackend)
    .then(() => dispatch(fetchProject(objToBackend.projectId)))
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

const fetchProjects = (userId) => (dispatch) => {
    dispatch(projectsRequested())
    service.getProjects(userId)
    .then(projects => dispatch(projectsLoaded(projects)) )
    .catch(error => dispatch(projectsError(error)) )
}

const setProject = project => {
    return {
        type: 'PROJECT_SELECT_SUCCESS',
        payload: project
    }
}

const fetchProject = (projectId) => (dispatch) => {
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

const fetchCards = (projectId) => (dispatch) => {
    dispatch(cardsRequested())
    service.getCards(projectId)
        .then(data => dispatch(cardsLoaded(data)))
        .catch(err => dispatch(cardsError(err)))
}

const setTheme = theme => {
    return {
        type: 'USER_THEME_CHANGED',
        payload: theme
    }
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

const todoUpdateError = error => {
    return {
        type: 'TODO_UPDATE_FAILURE',
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

const todoCreated = (todo, projectId) => (dispatch) => {
    service.createTodo(todo, projectId)
    .then(todo => dispatch(todoSelected(todo._id)))
    // .then(() => fetchCards(dispatch, projectId)) //был расположен вторым then
    .then(() => dispatch(fetchTodos(projectId)))
    .catch(err => dispatch(createTodoError(err.message)))
}

const createTodoError = error => {
    return {
        type: 'TODO_CREATED_FAILURE',
        payload: error
    }
}

const clearCreateTodoError = () => {
    return { type: 'CLEAR_TODO_ERROR' }
}

const clearUpdateTodoError = () => {
    return { type: 'CLEAR_UPDATE_TODO_ERROR' }
}
 
const todoUpdate = (id, projectId, startDate = null, endDate = null, color = null, title = null, priority = null, owner = null) => (dispatch) => {
    let objToUpdate = {}

    if (startDate && endDate) objToUpdate = { id, startDate, endDate }
    else if (color) objToUpdate = { id, color }
    else if (title) objToUpdate = { id, title }
    else if (priority) objToUpdate = { id, priority }
    else if (owner) objToUpdate = { id, owner }

    service.updateCardItem(objToUpdate)
    .then(() => service.updateTodo(objToUpdate))
    .then(() => dispatch(todoSelected(id)))
    .then(() => dispatch(fetchTodos(projectId)))
    .then(() => dispatch(fetchCards(projectId)))
    .then(() => dispatch({ type: 'TODO_UPDATED' }))
    .catch((err) => dispatch(todoUpdateError(err.message)))
}

const todoSelected = (id) => (dispatch) => {
    dispatch(todoSelectedLoading())
    service.getTodo(id)
    .then(todo => dispatch({ type: 'TODO_SELECTED', payload: todo }) )
}

const projectUpdate = (projectId, items) => (dispatch) => {
    service.updateProjectItems({ projectId, items })
    .then(() => dispatch({ type: 'SELECTED_PROJECT_UPDATED' }))
    .then(() => dispatch(fetchProject(projectId)))
}

const fetchTodos = (projectId) => (dispatch) => {
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

const moveCardItem = (transferInfo) => {
    return { type: 'MOVE_CARD_ITEM', payload: transferInfo }
}

const saveCards = (cards) => {
    service.saveCards(cards)
    return {
        type: 'CARDS_SAVED'
    }
}

const deleteCard = (objToBackend, projectItems) => (dispatch) => {
    service.deleteCard(objToBackend)
    .then(() => dispatch(projectUpdate(objToBackend.projectId, projectItems)))
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

const setRecentProjects = (projectId) => (dispatch) => {
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
    setTheme,
    cardsLoaded,
    projectUpdate,
    createCard,
    deleteCard,
    clearCreateTodoError,
    clearUpdateTodoError,
    moveCardItem
}