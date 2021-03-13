import React from 'react'
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { useRoutes } from '../../routes'

import './app.css'

const App = ({ token }) => {

	const routes = useRoutes(!!token)
	const isMobile = window.innerWidth < 600

	return (
		<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
			{routes}
		</DndProvider>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token
	}
}

export default connect(mapStateToProps)(App) 