import React from 'react'
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { lightTheme, darkTheme, muiThemeLight, muiThemeDark } from '../../Theme'
import GlobalStyles from '../../GlobalStyles'

import { useRoutes } from '../../routes'

import './app.css'
import { ThemeProvider } from 'styled-components'
import { createMuiTheme, ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';

const App = ({ token, theme }) => {
	
	const routes = useRoutes(!!token)
	const isMobile = window.innerWidth < 600
	const muiTheme = createMuiTheme(theme === 'light' ? muiThemeLight: muiThemeDark)
	
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<MaterialThemeProvider theme={muiTheme}>
			<>
			<GlobalStyles />
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				{routes}
			</DndProvider>
			</>
			</MaterialThemeProvider>
		</ThemeProvider>
	)
}

const mapStateToProps = (state) => {
	console.log('state', state)
	return {
		token: state.user.token,
		theme: state.user.theme
	}
}

export default connect(mapStateToProps)(App) 