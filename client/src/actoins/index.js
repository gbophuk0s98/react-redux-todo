import { validateAuthForm, validateRegForm, isEmptyObject } from '../validation'
import ProjectService from '../service'

const service = new ProjectService()

const cardsRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
}

const transferCardsItems = result => {
    return {
        type: 'TRANSFER_CARDS_ITEMS',
        payload: result
    }
}

const changeForm = event => {
    return {
        type: 'FORM_CHANGED',
        payload: event,
    }
}

const registerHandler = form => {

    const errors = validateRegForm(form)
    if (isEmptyObject(errors)) {
        return {
            type: 'REGISTER_FORM_SUBMITED',
            payload: form
        }
    }
    return {
        type: 'REGISTER_FORM_ERROR',
        payload: errors
    }
}

const loginHandler = form => {
    const errors = validateAuthForm(form)
    if (isEmptyObject(errors)) {
        service.login(form)
        return {
            type: 'LOGIN_FORM_SUBMITED',
            payload: form
        }
    }
    return {
        type: 'LOGIN_FORM_ERROR',
        payload: errors
    }
}

const clearErrors = () => {
    return {
        type: 'CLEAR_FORM_ERRORS'
    }
}

export {
    cardsRequested,
    transferCardsItems,
    changeForm,
    registerHandler,
    loginHandler,
    clearErrors
}