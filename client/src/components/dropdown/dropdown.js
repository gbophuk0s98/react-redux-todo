import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProject } from '../../actoins'
import { Button, Menu, MenuItem } from '@material-ui/core'

import './dropdown.css'

const DropDown = ({ recentProjects, fetchProject }) => {

    const [anchorEl, setAnchorEl] = useState(false)

    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const ProjectsList = () => {
        return (
            <>
            <span className="projectList-label">НЕДАВНИЕ:</span>
            {
                recentProjects.map(project => {
                    return (
                        <MenuItem
                            key={project._id}
                            onClick={() => {
                                handleClose()
                                fetchProject(project._id)
                            }}
                        >
                            {project.title}
                        </MenuItem>
                    )
                })
            }
            </>
        )
    }

    return (
        <div>
        <Button 
        onClick={handleClick}
        >
            Проекты
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <ProjectsList />
            <MenuItem onClick={handleClose}>
                <Button>
                    <Link to="/projectList">
                        Все проекты
                    </Link>
                </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Button>
                    <Link to="/createProject">
                        Создать...
                    </Link>
                </Button>
            </MenuItem>
        </Menu>
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