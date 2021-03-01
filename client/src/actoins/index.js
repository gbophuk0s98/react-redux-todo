import { validateAuthForm, validateRegForm, isEmptyObject } from '../validation'
import ProjectService from '../service'
import uuid from 'react-uuid'

const service = new ProjectService()

const cardsRequested = () => {
    return {
        type: 'FETCH_CARDS_REQUEST',
    }
}

const cardsError = error => {
    return {
        type: 'FETCH_CARDS_FAILURE',
        payload: error
    }
}

const cardsLoaded = newCards => {
    return {
        type: 'FETCH_CARDS_SUCCESS',
        payload: newCards
    }
}

const dataFromBackendtoObject = (data) => {
    let newObject = {}
    data.forEach(item => {
        newObject[uuid()] = item
        item.items = [{id: uuid(), content: `${uuid()}+ !!!!!!!!!`}]
    })
    return newObject
}

const fetchCards = (dispatch) => {
    dispatch(cardsRequested())
    service.getCards()
        .then( data => {
            console.log('data', data)
            dispatch(cardsLoaded(data))
        })
        .catch(err => dispatch(cardsError(err)))
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
        service.register(form)
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
    fetchCards,
    transferCardsItems,
    changeForm,
    registerHandler,
    loginHandler,
    clearErrors
}