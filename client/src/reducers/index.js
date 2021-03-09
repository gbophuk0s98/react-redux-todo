const initialState = {
    cards: [],
    todos: {
        items: [],
        loading: true,
        error: null,
    },
    projects: [],
    form: {
        userName: '',
        email: '',
        password: '',
        matchPassword: '',
    },
    formErrors: {
        userName: '',
        email: '',
        password: '',
        matchPassword: '',
    },
    authError: '',
    user: {
        name: '',
        email: '',
        userId: '',
    },
    project: {
        id: '',
        title: '',
        description: '',
        key: '',
    },
}

const setCards = (state, payload) => {
    return {
        ...state,
        cards: payload
    }
}

const updatePosNumbers = (arr) => {
    return arr.map((el, index) => {
        el.posNumber = index
        return el
    })
}

const transferItems = (state, payload) => {
    if (!payload.destination) return state
    let newCards = []
    const { source, destination } = payload
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = state.cards[source.droppableId]
        const destColumn = state.cards[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        newCards = state.cards.map((el, index) => {
            if (index.toString()===source.droppableId) return { ...el, items: updatePosNumbers(sourceItems) }
            if (index.toString()===destination.droppableId) return { ...el, items: updatePosNumbers(destItems) }
            return el
        })
    } else {
        const column = state.cards[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        newCards = state.cards.map((el, index) => {
            if (index.toString()===source.droppableId) return { ...el, items: updatePosNumbers(copiedItems) }
            return el
        })
    }
    return {
        ...state,
        cards: newCards
    }
}

const changeForm = (state, form, event) => {
    return {
        ...state,
        form: {
            ...form,
            [event.target.name]: event.target.value
        }
    }
}

const setFormErrors = (state, payload) => {
    return {
        ...state,
        formErrors: { ...payload }
    }
}

const clearErrors = (state) => {
    return {
        ...state,
        formErrors: {
            userName: '',
            email: '',
            password: '',
            matchPassword: '',
        }
    }
}

const clearUser = (state) => {
    return {
        ...state,
        user: {
            name: '',
            email: '',
            userId: '',
        },
    }
}

const setProject = (state, project) => {
    const { _id, title, description, key } = project
    return {
        ...state,
        project: {
             id: _id,
             title: title,
             description: description,
             key: key,
        }
    }
}

const setProjects = (state, projects) => {
    return {
        ...state,
        projects : projects
    }
}

const setUser = (state, payload) => {
    console.log('FromBackend ( reducer.setUser() )', payload)
    return {
        ...state,
        user: { ...payload }
    }
}

const setUserError = (state, payload) => {
    return {
        ...state,
        authError: payload
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'USER_CREATED_SUCCESS':
            return setUser(state, action.payload)
        case 'USER_CREATED_FAILURE':
            return setUserError(state, action.payload)
        case 'AUTH_ERROR_CLEAR':
            return {
                ...state,
                authError: ''
            }
        case 'USER_LOGOUT_SUCCESS':
            return clearUser(state)
        case 'USER_PROJECT_CREATED':
            return { ...state }
        case 'PROJECT_CREATED_SUCCESS':
            return setProject(state, action.payload)
        case 'FETCH_PROJECTS_REQUEST':
            return state
        case 'FETCH_PROJECTS_FAILURE':
            return state
        case 'FETCH_PROJECTS_SUCCESS':
            return setProjects(state, action.payload)
        case 'FETCH_CARDS_REQUEST':
            return state
        case 'FETCH_CARDS_SUCCESS':
            return setCards(state, action.payload)
        case 'FETCH_CARDS_FAILURE':
            return state
        case 'FETCH_TODOS_REQUEST':
            return state
        case 'FETCH_TODOS_SUCCESS':
            return {
                ...state,
                todos: action.payload
            }
        case 'FETCH_TODOS_FAILURE':
            return state
        case 'TODO_CREATED':
            return state
        case 'TODO_UPDATED':
            return state
        case 'TRANSFER_CARDS_ITEMS':
            return transferItems(state, action.payload)
        case 'FORM_CHANGED':
            return changeForm(state, state.form, action.payload)
        case 'REGISTER_FORM_SUBMITED':
            return state
        case 'REGISTER_FORM_ERROR':
            return setFormErrors(state, action.payload)
        case 'LOGIN_FORM_SUBMITED':
            return state
        case 'LOGIN_FORM_ERROR':
            return setFormErrors(state, action.payload)
        case 'CLEAR_FORM_ERRORS':
            return clearErrors(state)
        default:
            return state
    }
}


export default reducer