import React from 'react'
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { lightTheme, darkTheme } from '../../Theme'
import { GlobalStyles } from '../../GlobalStyles'

import { useRoutes } from '../../routes'

import './app.css'
import { ThemeProvider } from 'styled-components'

const App = ({ token, theme }) => {

	const routes = useRoutes(!!token)
	const isMobile = window.innerWidth < 600

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<>
			<GlobalStyles />
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				{routes}
			</DndProvider>
			</>
		</ThemeProvider>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		theme: state.theme
	}
}

export default connect(mapStateToProps)(App) 