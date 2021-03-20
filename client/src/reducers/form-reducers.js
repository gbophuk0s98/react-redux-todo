const updateAuthForms = (state, action) => {

    const initialFormsState = {
        userName: '',
        email: '',
        password: '',
        matchPassword: '',
        formLoading: false,
        formErrors: {},
        authError: null,
    }

    if (state === undefined) return initialFormsState

    switch (action.type) {
        case 'FORM_CHANGED':
            const { name, value } = action.payload.target
            return { ...state.form, [name]: value }
        case 'REGISTER_FORM_SUBMITED':
        case 'LOGIN_FORM_SUBMITED':
            return { ...state.form, formLoading: false }
        case 'CLIENT_FORM_SENDING':
            return { ...state.form, formLoading: true }
        case 'REGISTER_FORM_ERROR':
        case 'LOGIN_FORM_ERROR':
            return { ...state.form, formErrors: { ...action.payload } }
        case 'CLEAR_FORM_ERRORS':
            return { ...state.form, formErrors: { ...action.payload } }
        case 'USER_AUTHENTICATION_FAILURE':
            return { ...state.form, authError: action.payload, formLoading: false }
        case 'AUTH_ERROR_CLEAR':
            return { ...state.form, authError: null, formLoading: false }
        default:
            return state.form
    }
}

export default updateAuthForms