import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

const Header = () => {
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
                    <Link className="nav-link" to="/about">Об авторе</Link>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Выход</button>
                </form>
            </div>
        </nav>
    )
}

export default Header