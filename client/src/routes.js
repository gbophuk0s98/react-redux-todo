import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header'
import { CardPage, RoadMapPage, RegPage, LoginPage, ProjectPage, ProjectListPage } from './components/pages'

export const useRoutes = (isAuthenticated = true, location = null) => {
    console.log(location)

        if (isAuthenticated) {
            return (
                <>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route path="/cards">
                                <CardPage />
                            </Route>
                            <Route path="/roadmap" exact>
                                <RoadMapPage />
                            </Route>
                            <Route path="/createProject" exact>
                                <ProjectPage />
                            </Route>
                            <Route path="/projectList" exact>
                                <ProjectListPage />
                            </Route>
                            <Redirect to='/projectList' />
                        </Switch>
                    </div>
                </>
            )
        }
        return (
            <div className="container">
                <Switch>
                    <Route path="/register" exact>
                        <RegPage />
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <Redirect to='/login' />
                </Switch>
            </div>
        )

}
