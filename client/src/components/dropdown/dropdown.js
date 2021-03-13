import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './dropdown.css'

const DropDown = ({ recentProjects }) => {

    const [open, setOpen] = useState(false)

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
                            onClick={() => {}}
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
                        <ProjectsList />
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
        recentProjects: state.recentProjects,
        selectedProject: state.selectedProject,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)