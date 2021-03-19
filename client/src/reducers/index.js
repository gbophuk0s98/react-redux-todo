import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
    cards: {
        items: [],
        loading: false,
        error: null,
    },
    todos: {
        items: [],
        loading: false,
        error: null,
    },
    projects: {
        items: [],
        loading: true,
        error: null,
    },
    recentProjects: [],
    form: {
        userName: '',
        email: '',
        password: '',
        matchPassword: '',
    },
    formLoading: false,
    formErrors: {},
    authError: null,
    user: {
        name: '',
        email: '',
        userId: '',
    },
    theme: 'light',
    selectedProject: {},
    selectedTodo: {},
    selectedTodoLoading: false,
    createTodoError: null,
    updateTodoError: null,
    iconOptions: [
        { value: 'Наивысший', label: 'Наивысший', styles: { fill: 'red', opacity: '1' } },
        { value: 'Высокий', label: 'Высокий', styles: { fill: '#ff4d4b', opacity: '0.8' } },
        { value: 'Средний', label: 'Средний', styles: { fill: '#ff902d', opacity: '1' } },
        { value: 'Низкий', label: 'Низкий', styles: { fill: '#2dee36', opacity: '0.8' } },
    ]
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
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = state.cards.items[source.droppableId]
        const destColumn = state.cards.items[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        newCards = state.cards.items.map((el, index) => {
            if (index.toString() === source.droppableId) return { ...el, items: updatePosNumbers(sourceItems) }
            if (index.toString() === destination.droppableId) return { ...el, items: updatePosNumbers(destItems) }
            return el
        })
    } else {
        const column = state.cards.items[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        newCards = state.cards.items.map((el, index) => {
            if (index.toString() === source.droppableId) return { ...el, items: updatePosNumbers(copiedItems) }
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

const moveItem = (state, payload) => {

    let newCards, newTargetCardIndex
    const { sourceCardIndex, targetCardIndex, currentItemIndex, currentItem } = payload
    const copiedCardsItems = [...state.cards.items]
    console.log('reducer !!', payload)
    if ((!sourceCardIndex && sourceCardIndex === undefined) || sourceCardIndex < 0 || !currentItem) {
        console.log('Условие сработало в редьюсере')
        console.log('!sourceCardIndex', !sourceCardIndex)
        console.log('sourceCardIndex < 0', sourceCardIndex < 0)
        console.log('!currentItem', !currentItem)
        console.log('copiedCardsItems', copiedCardsItems)
        newTargetCardIndex = targetCardIndex
        if (targetCardIndex < 0) newTargetCardIndex = 0
        console.log('newTargetCardIndex', newTargetCardIndex)
        copiedCardsItems[newTargetCardIndex].items.push(state.selectedTodo)
        newCards = copiedCardsItems.map((el, index) => {
            if (index === newTargetCardIndex) return { ...el, items: updatePosNumbers(copiedCardsItems[newTargetCardIndex].items) }
            return el
        })
    }
    else {
        console.log('Условие не сработало в редьюсере')
        copiedCardsItems[sourceCardIndex].items = [
            ...copiedCardsItems[sourceCardIndex].items.slice(0, currentItemIndex),
            ...copiedCardsItems[sourceCardIndex].items.slice(currentItemIndex + 1)
        ]
        copiedCardsItems[targetCardIndex].items.push(currentItem)
    
        newCards = copiedCardsItems.map((el, index) => {
            if (index === sourceCardIndex) return { ...el, items: updatePosNumbers(copiedCardsItems[sourceCardIndex].items) }
            if (index === targetCardIndex) return { ...el, items: updatePosNumbers(copiedCardsItems[targetCardIndex].items) }
            return el
        })
        console.log('newCards', newCards)
    }

    return {
        ...state,
        cards: {
            loading: false,
            error: null,
            items: newCards
        }
    }
}

const changeForm = (state, form, event) => {
    console.log('form', state.form)
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
        formErrors: { ...payload },
        formLoading: false
    }
}

const clearErrors = (state) => {
    return {
        ...state,
        formErrors: {},
        formLoading: false
    }
}

const clearState = (state) => {
    return {
        ...initialState,
        recentProjects: [],
    }
}

const setSelectedTodo = (state, payload) => {
    return {
        ...state,
        selectedTodo: { ...payload },
        selectedTodoLoading: false
    }
}

const setProjectSuccess = (state, project) => {
    const { _id, title, description, key } = project
    return {
        ...state,
        selectedProject: {
            id: _id,
            title: title,
            description: description,
            key: key,
            loading: false,
            error: null,
        },
        selectedTodo: {}
    }
}

const setProjectLoading = (state) => {
    return {
        ...state,
        selectedProject: {
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
        selectedProject: {
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
        projects: {
            items: projects,
            loading: false,
            error: null
        }
    }
}

const setRecentProjects = (state, project) => {
    let recentProjectsArray = state.recentProjects
    let filterArr = recentProjectsArray.filter(item => item._id === project._id)
    if (filterArr.length === 0) recentProjectsArray.unshift(project)
    if (recentProjectsArray.length === 4) recentProjectsArray.splice(-1, 1)
    console.log('CURRENT ARRAY:', recentProjectsArray)
    return {
        ...state,
        recentProjects: [...recentProjectsArray]
    }
}

const setUser = (state, payload) => {
    return {
        ...state,
        user: { ...payload }
    }
}

const setUserError = (state, payload) => {
    return {
        ...state,
        authError: payload,
        formLoading: false,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_THEME_CHANGED':
            return { ...state, theme: action.payload }
        case 'USER_CREATED_SUCCESS':
            return setUser(state, action.payload)
        case 'USER_CREATED_FAILURE':
            return setUserError(state, action.payload)
        case 'AUTH_ERROR_CLEAR':
            return {
                ...state,
                authError: null,
                formLoading: false,
            }
        case 'USER_LOGOUT_SUCCESS':
            return clearState(state)
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
        case 'FETCH_PROJECT_SUCCESS':
            return {
                ...state,
                selectedProject: { ...action.payload },
                selectedTodo: {}
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
        case 'CLEAR_CARDS_ERROR':
            return { ...state, cards: { ...state.cards, error: null }}
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
            return { ...state, createTodoError: null }
        case 'TODO_CREATED_FAILURE':
            return { ...state, createTodoError: action.payload }
        case 'CLEAR_TODO_ERROR':
            return { ...state, createTodoError: null }
        case 'TODO_UPDATE_FAILURE':
            return { ...state, updateTodoError: action.payload}
        case 'CLEAR_UPDATE_TODO_ERROR':
            return { ...state, updateTodoError: null }
        case 'TODO_UPDATED':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    error: null,
                }
            }
        case 'SELECTED_TODO_LOADING':
            return { ...state, selectedTodoLoading: true }
        case 'TODO_SELECTED':
            return setSelectedTodo(state, action.payload)
        case 'TRANSFER_CARDS_ITEMS':
            return transferItems(state, action.payload)
        case 'MOVE_CARD_ITEM':
            return moveItem(state, action.payload)
        case 'FORM_CHANGED':
            return changeForm(state, state.form, action.payload)
        case 'REGISTER_FORM_SUBMITED':
            return { ...state, formLoading: false }
        case 'REGISTER_FORM_ERROR':
            return setFormErrors(state, action.payload)
        case 'CLIENT_FORM_SENDING':
            return { ...state, formLoading: true }
        case 'LOGIN_FORM_SUBMITED':
            return { ...state, formLoading: false }
        case 'LOGIN_FORM_ERROR':
            return setFormErrors(state, action.payload)
        case 'CLEAR_FORM_ERRORS':
            return clearErrors(state)
        case 'USER_RECENT_PROJECTS':
            return setRecentProjects(state, action.payload)
        case 'USER_CARD_CREATED':
            return state
        case 'USER_CARD_DELETE':
            return state
        default:
            return state
    }
}

const persistConfig = {
    key: 'myState',
    storage,
}

export default persistReducer(persistConfig, reducer)