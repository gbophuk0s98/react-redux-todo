import React from 'react'
import { useRoutes } from '../../routes'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import './app.css'
import { BrowserRouter as Router} from 'react-router-dom'
export const App = () => {

	const routes = useRoutes(false)
	const isMobile = window.innerWidth < 600

	return (
		<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
		<Router>
			{routes}
		</Router>
		</DndProvider>
	)
}