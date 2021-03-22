const updateSelectedTodo = (state, action) => {

    const initialSelctedTodoState = {
        _id: '',
        customId: '',
        creationNumber: '',
        content: '',
        background: '',
        owner: '',
        ownerEmail: '',
        posNumber: 0,
        priority: '',
        startDate: '',
        endDate: '',
        loading: false,
    }

    if (state === undefined) return initialSelctedTodoState

    switch (action.type) {
        case 'SELECTED_TODO_LOADING':
            return { ...initialSelctedTodoState, loading: true }
        case 'TODO_SELECTED':
            return { ...action.payload, loading: false }
        case 'SELECTED_TODO_CLEAR':
            return { ...initialSelctedTodoState }
        default:
            return state.selectedTodo
    }
}

export default updateSelectedTodo