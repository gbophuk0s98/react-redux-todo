import uuid from 'react-uuid'

const initialState = {
    cards: {},
    todos: [],
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
    }
}

const setCards = (state, payload) => {
    return {
        ...state,
        cards: payload
    }
}

const transferItems = (state, payload) => {
    if (!payload.destination) return state
    const { source, destination } = payload
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = state.cards[source.droppableId]
        const destColumn = state.cards[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)
        return {
            ...state,
            cards: {
                ...state.cards,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }
        }
    } else {
        const column = state.cards[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        return {
            ...state,
            cards:{
                ...state.cards,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }
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
        formErrors: {
            userName: '',
            email: '',
            password: '',
            matchPassword: '',
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
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