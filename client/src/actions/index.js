import { validateAuthForm, validateRegForm, isEmptyObject } from '../validation'
import ProjectService from '../service'

const service = new ProjectService()

// function actions
const registerHandler = (form) => (dispatch) => {

    dispatch({ type: 'SIGN_UP_FORM_SENDING' })
    const errors = validateRegForm(form)

    if (!isEmptyObject(errors)) {
        dispatch({
            type: 'SIGN_UP_FORM_ERROR',
            payload: errors
        })
    } else {
        service.register(form)
            .then(user => dispatch(setUser(user)))
            .then(() => dispatch({ type: 'SIGN_UP_FORM_SUBMITED' }))
            .then(() => dispatch(clearForms()))
            .catch(err => {
                dispatch(setUniversalError(err.message))
                dispatch({ type: 'STOP_SIGN_UP_FORM_LOADING' })
            })
    }
}

const loginHandler = (form) => (dispatch) => {

    dispatch({ type: 'SIGN_IN_FORM_SENDING' })

    const errors = validateAuthForm(form)

    if (!isEmptyObject(errors)) {
        dispatch({
            type: 'SIGN_IN_FORM_ERROR',
            payload: errors
        })
    } else {
        service.login(form)
            .then(user => dispatch(setUser(user)))
            .then(() => dispatch({ type: 'SIGN_IN_FORM_SUBMITED' }))
            .then(() => dispatch(clearForms()))
            .catch(err => {
                dispatch(setUniversalError(err.message))
                dispatch({ type: 'STOP_SIGN_IN_FORM_LOADING' })
            })
    }
}

const googleLogin = data => dispatch => {
    service.googleLogin(data)
        .then(user => dispatch(setUser(user)))
        .then(() => dispatch({ type: 'SIGN_IN_FORM_SUBMITED' }))
        .then(() => dispatch(clearForms()))
        .catch(err => {
            dispatch(setUniversalError(err.message))
            dispatch({ type: 'STOP_SIGN_IN_FORM_LOADING' })
        })
}

const createProject = (project, headers) => (dispatch) => {
    dispatch(createProjectRequested())
    service.createProject(project, headers)
        .then(res => {
            dispatch(createProjectSuccess(res))
            dispatch(setProject(res))
            dispatch(clearSelectedTodo())
            dispatch(setRecentProjects({
                ...headers,
                Project: `Id ${res._id}`
            }))
        })
        .catch(err => dispatch(setUniversalError(err.message)))
}

const createCard = (objToBackend, headers) => (dispatch) => {
    service.createCard(objToBackend, headers)
        .then(() => dispatch(fetchProject(headers)))
        .then(() => dispatch(setUniversalMessage('Карточка добавлена!')))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const fetchProjects = (headers) => (dispatch) => {
    dispatch(projectsRequested())
    service.getProjects(headers)
        .then(projects => dispatch(projectsLoaded(projects)))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const fetchProject = (headers) => (dispatch) => {
    service.getProject(headers)
        .then(project => dispatch(setProject(project)))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const setRecentProjects = (headers) => (dispatch) => {
    service.getProject(headers)
        .then(project => dispatch({ type: 'USER_RECENT_PROJECTS', payload: project }))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const fetchCards = (headers) => (dispatch) => {
    dispatch(cardsRequested())
    service.getCards(headers)
        .then(data => dispatch(cardsLoaded(data)))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const todoCreated = (todo, headers) => (dispatch) => {
    service.createTodo(todo, headers)
        .then(todo => dispatch(todoSelected({
            ...headers,
            Todo: `Id ${todo._id}`
        })))
        .then(() => dispatch(fetchTodos(headers)))
        .then(() => dispatch(setUniversalMessage('Задача успешно создана!')))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const todoUpdate = (
    id, headers, startDate = null, endDate = null,
    color = null, title = null, priority = null, owner = null,
    description = null) => (dispatch) => {

        let objToUpdate = {}

        if (startDate && endDate) objToUpdate = { id, startDate, endDate }
        else if (color) objToUpdate = { id, color }
        else if (title) objToUpdate = { id, title }
        else if (priority) objToUpdate = { id, priority }
        else if (owner) objToUpdate = { id, owner }
        else if (description) objToUpdate = { id, description }

        service.updateCardItem(objToUpdate, headers)
            .then(() => {
                service.updateTodo(objToUpdate, headers).then(res => dispatch(setUniversalMessage(res.message)))
            })
            .then(() => dispatch(fetchTodos(headers)))
            .then(() => dispatch(fetchCards(headers)))
            .then(() => dispatch(todoSelected({ ...headers, Todo: `Id ${id}` })))
            .catch(err => dispatch(setUniversalError(err.message)))
    }

const todoSelected = (headers) => (dispatch) => {
    dispatch(todoSelectedLoading())
    service.getTodo(headers)
        .then(todo => dispatch({ type: 'TODO_SELECTED', payload: todo }))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const projectUpdate = (projectId, items, headers) => (dispatch) => {
    service.updateProjectItems({ projectId, items }, headers)
        .then(() => dispatch(fetchProject(headers)))
        .then(() => dispatch(setUniversalMessage('Доска обновлена!')))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const fetchTodos = (headers) => (dispatch) => {
    dispatch(todosRequested())
    service.getTodos(headers)
        .then(data => dispatch(todosLoaded(data)))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const deleteCard = (objToBackend, projectItems, headers) => (dispatch) => {
    service.deleteCard(objToBackend, headers)
        .then(() => dispatch(projectUpdate(objToBackend.projectId, projectItems, headers)))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const updateCardTitle = (objToBackend, headers) => (dispatch) => {
    dispatch(updateCardTitleRequested())
    service.updateCardTitle(objToBackend, headers)
        .then(res => dispatch(setUniversalMessage(res.message)))
        .then(() => dispatch(fetchProject(headers)))
        .catch(err => dispatch(setUniversalError(err.message)))
}

const saveCards = (cards, headers) => (dispatch) => {
    service.saveCards(cards, headers)
        .catch(err => dispatch(setUniversalError(err.message)))
}

const moveCardItem = (transferInfo) => dispatch => {
    dispatch({
        type: 'MOVE_CARD_ITEM',
        payload: transferInfo
    })
    dispatch(setUniversalMessage('Задача успешно обновлена!'))
}

const addParticipant = (email, headers) => dispatch => {
    service.addParticipant(email, headers)
        .then(res => dispatch(setUniversalMessage(res.message)))
        .catch(e => dispatch(setUniversalError(e.message)))
}

// object actions
const clearUniversalError = () => {
    return {
        type: 'CLEAR_UNIVERSAL_ERROR'
    }
}

const setUniversalError = error => {
    return {
        type: 'SET_UNIVERSAL_ERROR',
        payload: error
    }
}

const clearUniversalMessage = () => {
    return {
        type: 'CLEAR_UNIVERSAL_MESSAGE'
    }
}

const setUniversalMessage = message => {
    return {
        type: 'SET_UNIVERSAL_MESSAGE',
        payload: message
    }
}

const clearForms = () => {
    return {
        type: 'FORMS_CLEAR'
    }
}

const clearSignUpFormErrors = () => {
    return {
        type: 'SIGN_UP_FORM_ERROR_CLEAR'
    }
}
const clearSignInFormErrors = () => {
    return {
        type: 'SIGN_IN_FORM_ERROR_CLEAR'
    }
}

const updateCardTitleRequested = () => {
    return {
        type: 'UPDATE_CARD_TITLE_REQUESTED'
    }
}

const clearSelectedTodo = () => {
    return {
        type: 'SELECTED_TODO_CLEAR'
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

const projectsRequested = () => {
    return {
        type: 'FETCH_PROJECTS_REQUEST'
    }
}

const projectsLoaded = projects => {
    return {
        type: 'FETCH_PROJECTS_SUCCESS',
        payload: projects
    }
}

const setProject = project => {
    return {
        type: 'PROJECT_SELECT_SUCCESS',
        payload: project
    }
}

const cardsRequested = () => {
    return {
        type: 'FETCH_CARDS_REQUEST',
    }
}

const cardsLoaded = newCards => {
    return {
        type: 'FETCH_CARDS_SUCCESS',
        payload: newCards
    }
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

const todosLoaded = todos => {
    return {
        type: 'FETCH_TODOS_SUCCESS',
        payload: todos
    }
}

const todoSelectedLoading = () => {
    return { type: 'SELECTED_TODO_LOADING' }
}

const transferCardsItems = (result) => {
    return {
        type: 'TRANSFER_CARDS_ITEMS',
        payload: result
    }
}

const changeSignInForm = event => {
    return {
        type: 'SIGN_IN_FORM_CHANGED',
        payload: event,
    }
}

const changeSignUpForm = event => {
    return {
        type: 'SIGN_UP_FORM_CHANGED',
        payload: event
    }
}

export {
    googleLogin,
    registerHandler,
    loginHandler,
    logoutHandler,
    changeSignInForm,
    changeSignUpForm,
    setTheme,
    fetchTodos,
    todoCreated,
    todoSelected,
    todoUpdate,
    fetchProjects,
    createProject,
    fetchProject,
    setRecentProjects,
    projectUpdate,
    createCard,
    deleteCard,
    cardsLoaded,
    saveCards,
    fetchCards,
    moveCardItem,
    updateCardTitle,
    transferCardsItems,
    clearSelectedTodo,
    clearForms,
    clearUniversalError,
    clearUniversalMessage,
    clearSignUpFormErrors,
    clearSignInFormErrors,
    addParticipant
}