import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header'
import { CardPage, RoadMapPage } from './components/pages'

export const useRoutes = (isAuthenticated = true) => {
    return (
        <>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/cards" exact>
                    <CardPage />
                </Route>
                <Route path="/roadmap" exact>
                    <RoadMapPage />
                </Route>
                <Redirect to="/cards" />
            </Switch>
        </div>
        </>
    )
}
