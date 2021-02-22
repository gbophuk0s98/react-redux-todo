import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Header from './components/header'
import App from './components/app'

const root = document.getElementById('root')

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Header />
            <App />
        </Provider>
    </React.StrictMode>,
    root
)
