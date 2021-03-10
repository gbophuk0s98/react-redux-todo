const initialState = {
    cards: {
        items: [],
        loading: true,
        error: null,
    },
    todos: {
        items: [],
        loading: true,
        error: null,
    },
    projects: {
        items: [],
        loading: true,
        error: null,
    },
    form: {
        userName: '',
        email: '',
        password: '',
        matchPassword: '',
    },
    formErrors: {},
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
        loading: false,
        error: null,
    },
    selectedTodo: {}
}

const setCards = (state, payload) => {
    return {
        ...state,
        cards: {
            items: payload,
            loading: false,
            error: null,
        }
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
        const sourceColumn = state.cards.items[source.droppableId]
        const destColumn = state.cards.items[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        newCards = state.cards.items.map((el, index) => {
            if (index.toString()===source.droppableId) return { ...el, items: updatePosNumbers(sourceItems) }
            if (index.toString()===destination.droppableId) return { ...el, items: updatePosNumbers(destItems) }
            return el
        })
    } else {
        const column = state.cards.items[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        newCards = state.cards.items.map((el, index) => {
            if (index.toString()===source.droppableId) return { ...el, items: updatePosNumbers(copiedItems) }
            return el
        })
    }
    return {
        ...state,
        cards: {
            items: newCards,
            loading: false,
            error: null
        }
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
        formErrors: {}
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

const setSelectedTodo = (state, payload) => {
    return {
        ...state,
        selectedTodo: { ...payload }
    }
}

const setProjectSuccess = (state, project) => {
    const { _id, title, description, key } = project
    console.log('project', project)
    return {
        ...state,
        project: {
             id: _id,
             title: title,
             description: description,
             key: key,
             loading: false,
             error: null,
        }
    }
}

const setProjectLoading = (state) => {
    return {
        ...state,
        project: {
             id: '',
             title: '',
             description: '',
             key: '',
             loading: true,
             error: null,
        }
    }
}

const setProjectError = (state, error) => {
    return {
        ...state,
        project: {
             id: '',
             title: '',
             description: '',
             key: '',
             loading: false,
             error: error,
        }
    }
}

const setProjects = (state, projects) => {
    return {
        ...state,
        projects : {
            items: projects,
            loading: false,
            error: null
        }
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
        case 'CREATE_PROJECT_REQUESTED':
            return setProjectLoading(state)
        case 'CREATE_PROJECT_SUCCESS':
            return setProjectSuccess(state, action.payload)
        case 'CREATE_PROJECT_FAILURE':
            return setProjectError(state, action.payload)
        case 'FETCH_PROJECTS_REQUEST':
            return {
                ...state,
                projects: {
                    items: [],
                    loading: true,
                    error: null
                }
            }
        case 'FETCH_PROJECTS_FAILURE':
            return {
                ...state,
                projects: {
                    items: [],
                    loading: false,
                    error: action.payload
                }
            }
        case 'FETCH_PROJECTS_SUCCESS':
            return setProjects(state, action.payload)
        case 'FETCH_CARDS_REQUEST':
            return {
                ...state,
                cards: {
                    items: [],
                    loading: true,
                    error: null,
                }
            }
        case 'FETCH_CARDS_SUCCESS':
            return setCards(state, action.payload)
        case 'FETCH_CARDS_FAILURE':
            return {
                ...state,
                cards: {
                    items: [],
                    loading: false,
                    error: action.payload,
                }
            }
        case 'FETCH_TODOS_REQUEST':
            return {
                ...state,
                todos: {
                    items: [],
                    loading: true,
                    error: null,
                }
            }
        case 'FETCH_TODOS_SUCCESS':
            return {
                ...state,
                todos: {
                    items: action.payload,
                    loading: false,
                    error: null,
                }
            }
        case 'FETCH_TODOS_FAILURE':
            return {
                ...state,
                todos: {
                    items: [],
                    loading: false,
                    error: action.payload,
                }
            }
        case 'TODO_CREATED':
            return state
        case 'TODO_UPDATED':
            return state
        case 'TODO_SELECTED':
            return setSelectedTodo(state, action.payload)
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