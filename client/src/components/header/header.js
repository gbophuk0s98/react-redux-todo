import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import AuthContext from '../../context'
import * as actions from '../../actoins'
import './header.css'

const Header = ({ user, logoutHandler }) => {

    const [open, setOpen] = useState(false)
    const auth = useContext(AuthContext)

    const DropDown = () => {
        return (
            <div className="my-dropdown">
                <div 
                    className="btn btn-secondary dropdown-toggle" 
                    onClick={() => setOpen(!open)}
                >Проекты
                </div>

                {open && 
                    <div className="my-dropdown-menu"  onClick={() => setOpen(!open)}>
                        <Link className="dropdown-item" to="/projectList">Все проекты</Link>
                        <Link className="dropdown-item" to="/createProject">Создать...</Link>
                    </div>
                }
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <Link className="navbar-brand" to="/cards">CroCodileUI</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/cards">Главная
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/roadmap">Карта</Link>
                    </li>
                    <li>
                        <DropDown />
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <button
                    className="btn btn-secondary my-2 my-sm-0" 
                    type="submit"
                    onClick={() => {
                        auth.logout(user.id, user.token)
                        logoutHandler()
                    }}
                    >Выход</button>
                </form>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    const { logoutHandler } = bindActionCreators(actions, dispatch)
    return {
        logoutHandler
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)