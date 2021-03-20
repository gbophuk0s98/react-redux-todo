const updateAppErrors = (state, action) => {

    const initialSAppErrosState = {
        createTodoError: null,
        updateTodoError: null,
    }

    if (state === undefined) return initialSAppErrosState

    switch (action.type) {
        case 'TODO_CREATED':
            return { ...initialSAppErrosState, createTodoError: null }
        case 'TODO_CREATED_FAILURE':
            return { ...initialSAppErrosState, createTodoError: action.payload }
        case 'CLEAR_TODO_ERROR':
            return { ...initialSAppErrosState, createTodoError: null }
        case 'TODO_UPDATE_FAILURE':
            return { ...initialSAppErrosState, updateTodoError: action.payload }
        case 'CLEAR_UPDATE_TODO_ERROR':
            return { ...initialSAppErrosState, updateTodoError: null }
        default:
            return state.appErrors
    }
}

export default updateAppErrors