const updateUser = (state, action) => {

    const initialUserState = {
        name: '',
        email: '',
        userId: '',
        token: '',
        theme: 'light',
    }

    if (state === undefined) return initialUserState

    switch (action.type) {
        case 'USER_THEME_CHANGED':
            return { ...state.user, theme: action.payload }
        case 'USER_CREATED_SUCCESS':
            return { ...action.payload }
        case 'USER_LOGOUT_SUCCESS':
            return initialUserState
        case 'TODO_UPDATED':
                return state.user
        default:
            return state.user
    }
}

export default updateUser