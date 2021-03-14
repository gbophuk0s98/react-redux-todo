import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProject } from '../../actoins'
import { DropDownMenuWrapper, Button, DropDownProjectList } from '../styled-components'

import './dropdown.css'

const DropDown = ({ recentProjects, fetchProject }) => {

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
                            onClick={() => fetchProject(project._id)}
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
            <Button 
                className="btn dropdown-toggle" 
                onClick={() => setOpen(!open)}
            >Проекты
            </Button>

            {open && 
                <DropDownMenuWrapper onClick={() => setOpen(!open)}>
                    <DropDownProjectList>
                        <ProjectsList />
                    </DropDownProjectList>
                    <div className="menu-links">
                        <Link className="dropdown-item" to="/projectList">Все проекты</Link>
                        <Link className="dropdown-item" to="/createProject">Создать...</Link>
                    </div>
                </DropDownMenuWrapper>
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
    return {
        fetchProject: (projectId) => fetchProject(dispatch, projectId),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)