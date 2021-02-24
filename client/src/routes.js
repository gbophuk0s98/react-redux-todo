import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header'
import { CardPage, AboutPage } from './components/pages'

export const useRoutes = (isAuthenticated = true) => {
    return (
        <>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/cards" exact>
                    <CardPage />
                </Route>
                <Route path="/about" exact>
                    <AboutPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        </div>
        </>
    )
}
