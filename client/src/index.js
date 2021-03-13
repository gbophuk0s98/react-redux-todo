import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { store, persistor } from './store'
import App from './components/app'

const root = document.getElementById('root')

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Router>
        </Provider>
    </React.StrictMode>,
    root
)
