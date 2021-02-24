import React from 'react'
import { useRoutes } from '../../routes'

import './app.css'
import { BrowserRouter as Router} from 'react-router-dom'
export const App = () => {
	const routes = useRoutes(true)

	return (
		<Router>
			{routes}
		</Router>
	)
}