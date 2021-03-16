import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProject } from '../../actoins'
import { Button, Menu, MenuItem } from '@material-ui/core'

import './dropdown.css'

class DropDownWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.wrapper = React.createRef()
    }
    render() {
        return <div ref={this.wrapper}>{this.props.children}</div>
    }
}

const DropDown = ({ recentProjects, fetchProject }) => {

    const [anchorEl, setAnchorEl] = useState(false)

    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <DropDownWrapper>
            <Button
                onClick={handleClick}
            >
                Проекты
                <ArrowDropDownIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
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
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to='projectList'>
                        Все проекты
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to='/createProject'>
                        Создать...
                    </Button>
                </MenuItem>
            </Menu>
        </DropDownWrapper>
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