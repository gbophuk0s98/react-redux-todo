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
            return { ...action.payload, theme: state.user.theme }
        case 'USER_LOGOUT_SUCCESS':
            return { ...initialUserState }
        default:
            return state.user
    }
}

export default updateUser