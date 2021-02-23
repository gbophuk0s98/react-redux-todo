import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import store from './store'
import Header from './components/header'
import App from './components/app'

const root = document.getElementById('root')
const isMobile = window.innerWidth < 600

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/home">
                        <Header />
                        <App />
                    </Route>
                    <Redirect to="/home" />
                </Switch>
            </Router>
        </Provider>
        </DndProvider>
    </React.StrictMode>,
    root
)
