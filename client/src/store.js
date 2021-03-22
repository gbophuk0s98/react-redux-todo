import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import reducer from './reducers'

const logMiddleware = ({ getState, dispatch }) => (dispatch) => (action) => {
    console.log('Action type:', action.type)
    return dispatch(action)
}

const compose = (...funcs) => (comp) => {
    return funcs.reduceRight(
        (wrapped, f) => f(wrapped), comp)
}

export const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk, logMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)

export const persistor = persistStore(store)