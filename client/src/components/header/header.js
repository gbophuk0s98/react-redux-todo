import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'
import DropDown from '../dropdown'
import { HeaderWrapper, Button } from '../styled-components'

import './header.css'

const Header = ({ logoutHandler, setTheme, theme, selectedProject, user }) => {

    const themeToggler = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light')
	}

    return (
        <HeaderWrapper>
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Button 
                onClick={themeToggler}
                className="btn"
            >
                CroCodileUI
            </Button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/cards">Главная
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/roadmap">Дорожная карта</Link>
                    </li>
                    <li>
                        <DropDown />
                    </li>
                    <li className="nav-item">
                        <div className="project-info">
                            <span className="nav-link-text">
                                {selectedProject.title}
                            </span>
                            <span className="nav-link-text">
                                {selectedProject.key}
                            </span>
                        </div>
                    </li>
                </ul>
                <div className="header-user-info">
                    <div className="header-user-title">
                        <span>{user.userName} ({user.email})</span>
                    </div>
                    <Button
                        className="btn" 
                        type="submit"
                        onClick={() => logoutHandler()}
                    >
                        Выход
                    </Button>
                </div>
            </div>
            </nav>
        </HeaderWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedProject: state.selectedProject,
        theme: state.theme,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { logoutHandler, setTheme } = bindActionCreators(actions, dispatch)
    return { logoutHandler, setTheme }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)