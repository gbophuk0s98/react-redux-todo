import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header'
import { CardPage, RoadMapPage, ProjectPage, ProjectListPage, SignIn, SignUp } from './components/pages'
import CardManagement from './components/card-management'
import { SnackbarProvider } from 'notistack'

export const useRoutes = (isAuthenticated = true) => {

        if (isAuthenticated) {
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
                            <Route path="/createProject" exact>
                                <ProjectPage />
                            </Route>
                            <Route path="/boardList" exact>
                                <ProjectListPage />
                            </Route>
                            <Route path="/cardsSettings">
                                <CardManagement />
                            </Route>
                            <Redirect to='/boardList' />
                        </Switch>
                    </div>
                </>
            )
        }
        return (
            <div className="container">
                <Switch>
                    <Route path="/register" exact>
                        <SnackbarProvider 
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            maxSnack={4}
                        >
                            <SignUp />
                        </SnackbarProvider>
                    </Route>
                    <Route path="/login" exact>
                        <SnackbarProvider 
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            maxSnack={4}
                        >
                            <SignIn />
                        </SnackbarProvider>
                    </Route>
                    <Redirect to='/login' />
                </Switch>
            </div>
        )

}
