import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import AuthContext from '../../context'
import { fetchProjects } from '../../actoins'

import Spinner from '../spinner'

import './dropdown.css'

const DropDown = ({ fetchProjects, projectsLoading, recentProjects }) => {

    const auth = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    useEffect(() => fetchProjects({ userId: auth.userId, token: auth.token }), [fetchProjects, auth])

    const ProjectsList = () => {
        return (
            <>
            <span className="projectList-label">НЕДАВНИЕ:</span>
            {
                recentProjects.map(project => {
                    return (
                        <div
                            className="projectList-item-title"
                            key={project._id}
                            onClick={() => auth.login(auth.userId, auth.token, project._id)}
                        >
                            <div>
                                {project.title}
                            </div>
                        </div>
                    )
                })
            }
            </>
        )
    }

    return (
        <div className="my-dropdown">
            <div 
                className="btn btn-secondary dropdown-toggle" 
                onClick={() => setOpen(!open)}
            >Проекты
            </div>

            {open && 
                <div className="my-dropdown-menu"  onClick={() => setOpen(!open)}>
                    <div className="dropdown-projectList">
                        { projectsLoading ? <Spinner/> : <ProjectsList /> }
                    </div>
                    <div className="menu-links">
                        <Link className="dropdown-item" to="/projectList">Все проекты</Link>
                        <Link className="dropdown-item" to="/createProject">Создать...</Link>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projectsLoading: state.projects.loading,
        recentProjects: state.recentProjects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (headers) => fetchProjects(dispatch, headers)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)