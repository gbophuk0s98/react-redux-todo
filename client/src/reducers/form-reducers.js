const updateAuthForms = (state, action) => {

    const initialFormsState = {
        signInForm: {
            form: {
                email: '',
                password: '',
            },
            formLoading: false,
            formErrors: {},
        },
        signUpForm: {
            form: {
                userName: '',
                email: '',
                password: '',
                matchPassword: '',
            },
            formLoading: false,
            formErrors: {},
        }
    }

    if (state === undefined) return initialFormsState

    switch (action.type) {
        case 'SIGN_IN_FORM_CHANGED':
            const { name, value } = action.payload.target
            return {
                ...state.form,
                signInForm: {
                    ...state.form.signInForm,
                    form: {
                        ...state.form.signInForm.form,
                        [name]: value,
                    }
                }
            }
        case 'SIGN_IN_FORM_SENDING':
            return {
                ...state.form,
                signInForm: {
                    ...state.form.signInForm,
                    formLoading: true
                }
            }
        case 'SIGN_IN_FORM_SUBMITED':
            return {
                ...state.form,
                signInForm: {
                    ...state.form.signInForm,
                    formLoading: false
                }
            }
        case 'SIGN_UP_FORM_CHANGED':
            const { target } = action.payload
            return {
                ...state.form,
                signUpForm: {
                    ...state.form.signUpForm,
                    form: {
                        ...state.form.signUpForm.form,
                        [target.name]: target.value,
                    }
                }
            }
        case 'SIGN_UP_FORM_SENDING':
            return {
                ...state.form,
                signUpForm: {
                    ...state.form.signUpForm,
                    formLoading: true
                }
            }
        case 'SIGN_UP_FORM_SUBMITED':
            return {
                ...state.form,
                signUpForm: {
                    ...state.form.signUpForm,
                    formLoading: false
                }
            }
        case 'STOP_SIGN_IN_FORM_LOADING':
            return {
                ...state.form,
                signInForm: {
                    ...state.form.signInForm,
                    formLoading: false
                }
            }
        case 'STOP_SIGN_UP_FORM_LOADING':
            return {
                ...state.form,
                signUpForm: {
                    ...state.form.signUpForm,
                    formLoading: false
                }
            }
        case 'SIGN_IN_FORM_ERROR': {
            return {
                ...state.form,
                signInForm: {
                    ...state.form.signInForm,
                    formErrors: action.payload,
                    formLoading: false,
                }
            }
        }
        case 'SIGN_UP_FORM_ERROR':
            return {
                ...state.form,
                signUpForm: {
                    ...state.form.signUpForm,
                    formErrors: action.payload,
                    formLoading: false,
                }
            }
        case 'FORMS_CLEAR':
            return { ...initialFormsState }
        case 'SIGN_IN_FORM_ERROR_CLEAR': 
            return {
                ...state.form,
                signInForm: {
                    ...state.form.signInForm,
                    formErrors: {},
                    formLoading: false,
                }
            }
        case 'SIGN_UP_FORM_ERROR_CLEAR': 
            return {
                ...state.form,
                signUpForm: {
                    ...state.form.signUpForm,
                    formErrors: {},
                    formLoading: false
                }
            }
        default:
            return state.form
    }
}

export default updateAuthForms