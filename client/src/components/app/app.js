import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { useRoutes } from '../../routes'
import AuthContext from '../../context'
import { useAuth } from '../../hooks'

import './app.css'
import { withRouter } from 'react-router'

const App = (props) => {

	const { token, projectId, userId, login, logout, addProject } = useAuth()
	const routes = useRoutes(!!token, props.location)
	const isMobile = window.innerWidth < 600

	return (
		<AuthContext.Provider value = { { token, userId, projectId, login, logout, addProject } }>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				{routes}
			</DndProvider>
		</AuthContext.Provider>
	)
}


export default withRouter(App) 