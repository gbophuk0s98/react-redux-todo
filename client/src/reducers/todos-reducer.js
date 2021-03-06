const updateTodos = (state, action) => {

    const initialCardsState = {
        items: [],
        loading: false,
    }

    if (state === undefined) return initialCardsState

    switch (action.type) {
        case 'FETCH_TODOS_REQUEST':
            return { ...initialCardsState, loading: true }
        case 'FETCH_TODOS_SUCCESS':
            return { ...initialCardsState, items: action.payload }
        default:
            return state.todos
    }

}

export default updateTodos