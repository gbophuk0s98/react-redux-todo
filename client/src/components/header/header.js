import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'
import DropDown from '../dropdown'

import './header.css'

const Header = ({ logoutHandler, selectedProject, user }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <Link className="navbar-brand" to="/cards">CroCodileUI</Link>

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
                    <button
                        className="btn btn-secondary my-2 my-sm-0" 
                        type="submit"
                        onClick={() => logoutHandler()}
                    >
                        Выход
                    </button>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedProject: state.selectedProject,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { logoutHandler } = bindActionCreators(actions, dispatch)
    return { logoutHandler }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)