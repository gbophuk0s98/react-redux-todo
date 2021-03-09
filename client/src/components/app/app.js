import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { BrowserRouter as Router} from 'react-router-dom'

import { useRoutes } from '../../routes'
import AuthContext from '../../context'
import { useAuth } from '../../hooks'

import './app.css'

const App = () => {

	const { token, login, userId, logout, projectId, addProject } = useAuth()
	const routes = useRoutes(!!token)
	const isMobile = window.innerWidth < 600

	return (
		<AuthContext.Provider value = { { token, userId, login, logout, projectId, addProject } }>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<Router>
					{routes}
				</Router>
			</DndProvider>
		</AuthContext.Provider>
	)
}


export default App